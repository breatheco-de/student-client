import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { store, loadMessages, markMessageAs } from '../actions/actions';
import { DropLink } from './react-components/src/index';
import { Session } from 'bc-react-session';
import { Notify } from 'bc-react-notifier';
const dropdowns = {
    'actionable': [
        { label: 'Respond now', slug: 'respond' },
        { label: 'Mark as read', slug: 'mark-as-read' },
        { label: 'Respond later', slug: 'mark-for-later' }
    ],
    'non-actionable': [
        { label: 'Mark as read', slug: 'mark-as-read' },
        { label: 'Read later', slug: 'mark-for-later' }
    ]
};

export default class ImportantMessages extends Flux.DashView{
    
    constructor(){
        super();
        this.state = {
            importantMessages: [],
        };
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount(){
      this.subscribe(store, "messages", (messages) => {
            if(Array.isArray(messages)) this.setState({ 
                importantMessages: messages.filter(m => ((m.type === 'actionable' && !m.answered) || (!m.read && m.priority==="HIGH")))
            });
      });
      loadMessages();
    }
    
    onSelect(opt, message){
        const {  access_token } = Session.getPayload();
        switch(opt.slug){
            case "respond":
                window.open(message.url+'?access_token='+access_token);
            break;
            case "mark-as-read":
                //if(message.type == "actionable") Notify.error('You cannot mark this message as read, you need to respond the message in order to delete it.');
                markMessageAs(message, 'read');
            break;
            case "mark-for-later":
                markMessageAs(message, 'later');
            break;
        }
    }
    
    render(){
        return (!this.state.importantMessages || this.state.importantMessages.length == 0) ? null :
        (<div className="alert important-messages">
            <h5>
                <i className="fas fa-exclamation-circle mr-3"></i>
                <span>There are {this.state.importantMessages.length} important messages that require your attention:</span>
            </h5>
            <ol>
            { this.state.importantMessages.map((m,i) => (<li key={i}>
                <DropLink 
                    dropdown={dropdowns[m.type]}
                    onSelect={(opt) => this.onSelect(opt, m)}
                >
                    { m.template.subject }
                </DropLink>
            </li>))}
            </ol>
        </div>);
    }
}
