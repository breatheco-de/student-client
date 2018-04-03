import Flux from '@4geeksacademy/react-flux-dash';
import React from 'react';

export function mouseTrap(Base, keymap=null) {
  return class extends Flux.View {
    
    constructor(props) {
      super(props);
      this.__mousetrapBindings = [];
      this.Mousetrap = require('mousetrap');
    }
    
    componentWillMount(){
        if(keymap)
        {
            for(var command in keymap){
                this.bindShortcut(keymap[command]);
            }
        }
    }

    bindShortcut(key) {
        if(typeof(key.osx) != 'undefined') key = key.osx;
        this.Mousetrap.bind(key, () => this.handleKeyShorcut(key));
        this.__mousetrapBindings.push(key);
    }
    
    handleKeyShorcut(key){
        console.log(key);
        const example = this.getWrappedInstance();
        this.refs.child.handleKeyShorcut(key);
    }
    
    unbindShortcut(key) {
      var index = this.__mousetrapBindings.indexOf(key);

      if (index > -1) {
        this.__mousetrapBindings.splice(index, 1);
      }

      this.Mousetrap.unbind(key);
    }

    unbindAllShortcuts() {
      if (this.__mousetrapBindings.length < 1) {
        return;
      }

      this.__mousetrapBindings.forEach(binding => {
        this.Mousetrap.unbind(binding);
      });
      this.__mousetrapBindings = [];
    }

    componentWillUnmount() {
      this.unbindAllShortcuts();
    }

    render() {
      return (
        <Base
          {...this.props}
        />
      );
    }
  };
}

export default mouseTrap;