/* global fetch, args, localStorage */
class Wrapper{
    
    constructor(){
        this.assetsPath = 'https://assets-alesanchezr.c9users.io/apis';
        this.apiPath = 'https://talenttree-alesanchezr.c9users.io';
        this.token = null;
    }
    
    setToken(token){
        this.token = token;
        localStorage.setItem('bc_token', token);
    }
    getToken(data){
        if(this.token) return this.token;
        else return localStorage.getItem('bc_token');
    }
    
    req(method, path, args){
        
        
        let opts = { 
            method, 
            headers: {'Content-Type': 'application/json'}
        };
        if(method === 'get'){
            path += this.serialize(args).toStr();
            this.token = this.getToken();
            if(this.token) path += `?access_token=${this.token}`;
        } 
        else
        {
            this.token = this.getToken();
            if(this.token) path += `?access_token=${this.token}`;
            //if(this.token) args.access_token = this.token;
            opts.body = this.serialize(args).toJSON();
        } 
        
        return new Promise((resolve, reject) => {
            fetch( path, opts)
            .then((resp) => {
                if(resp.status == 200) return resp.json();
                else if(resp.status == 403) reject({ msg: 'Invalid username or password', code: 403 }); 
                else if(resp.status == 401) reject({ msg: 'Unauthorized', code: 401 }); 
                else reject({ msg: 'Invalid username or password', code: 500 });
                return false;
            })
            .then((json) => { 
                if(!json) throw new Error('There was a problem processing the request');
                if(json.access_token) this.setToken(json.access_token);
                resolve(json);
                return json;
            })
            .catch((error) => {
                console.error(error.message);
                reject(error.message);
            });
        });
                
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
        }
    }
    
    credentials(){
        let url = this.assetsPath+'/credentials';
        return {
            autenticate: (username, password) => {
                return this.post(url+'/autenticate', { username, password });
            }
        };
    }
    syllabus(){
        let url = this.assetsPath+'/syllabus';
        return {
            get: (slug) => {
                return this.get(url+'/'+slug);
            }
        };
    }
    todos(){
        let url = this.apiPath;
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
}
export default new Wrapper();