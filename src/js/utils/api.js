/* global fetch, localStorage, window */
class Wrapper{
    
    constructor(){
        this.options = {
            assetsPath: (typeof process != 'undefined') ? process.env.ASSETS_URL+'/apis' : null,
            apiPath: (typeof process != 'undefined') ? process.env.API_URL : null,
            _debug: (typeof process != 'undefined') ? process.env.DEBUG : false,
            getToken: (type='api') => {
                return null;
            },
            onLoading: null,
            onLogout: null
        };
        this.isPending = false;
        this.pending = {
            get: {}, post: {}, put: {}, delete: {}
        };
    }
    calculatePending(){
        for(let method in this.pending)
            for(let path in this.pending[method])
                if(typeof this.pending[method] != 'undefined' && this.pending[method][path] === true){
                    if(!this.isPending){
                        this.isPending = true;
                        if(typeof this.options.onLoading == 'function') this.options.onLoading(this.isPending);
                    }
                    return true;
                } 
        
        if(this.isPending){
            this.isPending = false;
            if(typeof this.options.onLoading == 'function') this.options.onLoading(this.isPending);
        }
        return false;
    }
    _logError(error){ if(this.options._debug) console.error(error); }
    setOptions(options){ 
        this.options = Object.assign(this.options, options); 
    }
    fetch(...args){ return fetch(...args); }
    req(method, path, args){
        
        const token = this.options.getToken((path.indexOf('//assets') == -1) ? 'api':'assets');
        let opts = { 
            method, 
            headers: {'Content-Type': 'application/json'}
        };
        if(token) opts.headers['Authorization'] = token;
        
        if(method === 'get') path += this.serialize(args).toStr();
        else
        {
            if((method=='put') && !args) throw new Error('Missing request body');
            opts.body = this.serialize(args).toJSON();
        } 
        
        return new Promise((resolve, reject) => {
            
            if(typeof this.pending[method][path] !== 'undefined' && this.pending[method][path])
                reject({ pending: true, msg: `Request ${method}: ${path} was ignored because a previous one was already pending` });
            else this.pending[method][path] = true;
            
            //recalculate to check if it there is pending requests
            this.calculatePending();
            
            this.fetch( path, opts)
                .then((resp) => {
                    this.pending[method][path] = false;
                    //recalculate to check if it there is pending requests
                    this.calculatePending();
                    
                    if(resp.status == 200) return resp.json();
                    else{
                        this._logError(resp);
                        if(resp.status == 403) reject({ msg: 'Invalid username or password', code: 403 }); 
                        else if(resp.status == 401){
                            reject({ msg: 'Unauthorized', code: 401 }); 
                            if(this.options.onLogout) this.options.onLogout();
                        } 
                        else if(resp.status == 400) resp.json()
                                                        .then(err => 
                                                            reject({ msg: err.msg || err, code: 400 })
                                                        )
                                                        .catch(() =>
                                                            reject({ msg: 'Invalid Argument', code: 400 })
                                                        ) 
                        else reject({ msg: 'There was an error, try again later', code: 500 });
                    } 
                    return false;
                })
                .then((json) => { 
                    if(!json) throw new Error('There was a problem processing the request');
                    resolve(json);
                    return json;
                })
                .catch((error) => {
                    this.pending[method][path] = false;
                    //recalculate to check if it there is pending requests
                    this.calculatePending();
                    
                    this._logError(error.message);
                    reject(error.message);
                });
        });
                
    }
    _encodeKeys(obj){
        for(let key in obj){
            let newkey = key.replace('-','_');
            
            let temp = obj[key];
            delete obj[key];
            obj[newkey] = temp;
        }
        return obj;
    }
    _decodeKeys(obj){
        for(let key in obj){
            let newkey = key.replace('_','-');
            
            let temp = obj[key];
            delete obj[key];
            obj[newkey] = temp;
        }
        return obj;
    }
    post(...args){ return this.req('post', ...args); }
    get(...args){ return this.req('get', ...args); }
    put(...args){ return this.req('put', ...args); }
    delete(...args){ return this.req('delete', ...args); }
    serialize(obj){
        return {
            obj,
            toStr: function(){
                var str = "";
                for (var key in this.obj) {
                    if (str != "") {
                        str += "&";
                    }
                    str += key + "=" + encodeURIComponent(this.obj[key]);
                }
                return str;
            },
            toJSON: function(){
                return JSON.stringify(this.obj);
            }
        };
    }

    credentials(){
        let url = this.options.assetsPath+'/credentials';
        return {
            autenticate: (username, password) => {
                return this.post(url+'/auth', { username, password });
            },
            remind: (username) => {
                return this.post(url+'/remind/'+encodeURIComponent(username), { username });
            }
        };
    }
    syllabus(){
        let url = this.options.assetsPath+'/syllabus';
        return {
            get: (slug) => {
                if(!slug) throw new Error('Missing slug');
                else return this.get(url+'/'+slug);
            }
        };
    }
    todo(){
        let url = this.options.apiPath;
        return {
            getByStudent: (id) => {
                return this.get(url+'/student/'+id+'/task/');
            },
            add: (id, args) => {
                return this.post(url+'/student/'+id+'/task/', args);
            },
            update: (args) => {
                return this.post(url+'/task/'+args.id, args);
            }
        };
    }
    project(){
        let url = this.options.assetsPath;
        return {
            all: (syllabus_slug) => {
                return this.get(url+'/project/all');
            }
        };
    }
    user(){
        let url = this.options.apiPath;
        return {
            all: () => {
                return this.get(url+'/user/');
            },
            add: (args) => {
                return this.put(url+'/user/', args);
            },
            update: (id, args) => {
                return this.post(url+'/user/'+id, args);
            },
            delete: (id) => {
                return this.delete(url+'/user/'+id);
            }
        };
    }
    event(){
        let url = this.options.assetsPath;
        //this.options.token
        return {
            all: () => {
                return this.get(url+'/event/all');
            },
            get: (id) => {
                return this.get(url+'/event/'+id);
            },
            add: (args) => {
                return this.put(url+'/event/', args);
            },
            update: (id, args) => {
                return this.post(url+'/event/'+id, args);
            },
            delete: (id) => {
                return this.delete(url+'/event/'+id);
            }
        };
    }
    student(){
        let url = this.options.apiPath;
        let assetsURL = this.options.assetsPath;
        return {
            all: () => {
                return this.get(url+'/students/');
            },
            add: (args) => {
                return this.put(assetsURL+'/credentials/signup', args);
            },
            update: (id, args) => {
                return this.post(url+'/student/'+id, args);
            },
            delete: (id) => {
                return this.delete(url+'/student/'+id);
            }
        };
    }
    message(){
        //let url = this.options.apiPath;
        let assetsURL = this.options.assetsPath;
        return {
            getByStudent: (student_id, args=[]) => {
                return this.get(assetsURL+'/message/student/'+student_id, args);
            },
            templates: () => {
                return this.get(assetsURL+'/message/templates');
            },
            markAs: (messageId, status) => {
                return this.post(assetsURL+'/message/'+messageId+'/'+status);
            },
        };
    }
    cohort(){
        let url = this.options.apiPath;
        return {
            all: () => {
                return this.get(url+'/cohorts/');
            },
            get: (id) => {
                return this.get(url+'/cohort/'+id);
            },
            add: (args) => {
                return this.put(url+'/cohort/', args);
            },
            update: (id, args) => {
                return this.post(url+'/cohort/'+id, args);
            },
            delete: (id) => {
                return this.delete(url+'/cohort/'+id);
            },
            addStudents: (cohortId, studentsArray) => {
                studentsArray = studentsArray.map(id => {
                    return { student_id: id };
                });
                return this.post(url+'/student/cohort/'+cohortId, studentsArray);
            },
            removeStudents: (cohortId, studentsArray) => {
                studentsArray = studentsArray.map(id => {
                    return { student_id: id };
                });
                return this.delete(url+'/student/cohort/'+cohortId, studentsArray);
            }
        };
    }
    location(){
        let url = this.options.apiPath;
        return {
            all: () => {
                return this.get(url+'/locations/');
            },
            get: (id) => {
                return this.get(url+'/location/'+id);
            },
            add: (args) => {
                return this.put(url+'/location/', args);
            },
            update: (id, args) => {
                return this.post(url+'/location/'+id, args);
            },
            delete: (id) => {
                return this.delete(url+'/location/'+id);
            }
        };
    }
    profile(){
        let url = this.options.apiPath;
        return {
            all: () => {
                return this.get(url+'/profiles/');
            },
            get: (id) => {
                return this.get(url+'/profile/'+id);
            },
            add: (args) => {
                return this.put(url+'/profile/', args);
            },
            update: (id, args) => {
                return this.post(url+'/profile/'+id, args);
            },
            delete: (id) => {
                return this.delete(url+'/profile/'+id);
            }
        };
    }
    lessons(){
        let url = this.options.assetsPath;
        return {
            all: () => {
                return this.get(url+'/lesson/all');
            },
            get: (id) => {
                return this.get(url+'/lessons/'+id);
            }
        };
    }
    catalog(){
        let url = this.options.apiPath;
        return {
            all: () => {
                return this.get(url+'/catalogs/');
            },
            get: (slug=null) => {
                if(!slug) throw new Error('Missing catalog slug');
                return this.get(url+'/catalog/'+slug);
            }
        };
    }
    zap(){
        let url = this.options.assetsPath;
        return {
            all: () => {
                return this.get(url+'/zap/all');
            },
            execute: (slug=null) => {
                if(!slug) throw new Error('Missing zap slug');
                return this.post(url+'/zap/execute/'+slug);
            }
        };
    }
}
if(typeof module != 'undefined') module.exports = new Wrapper();
window.BC = new Wrapper();