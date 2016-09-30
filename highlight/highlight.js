/**
 * Created by dean on 16-9-30.
 */
var HL = function(settings){
    // obj
    var _H = {
        options : {
            selector : 'code'
        },
        init : function(settings){
            // assign
            if(typeof settings != "object"){
                settings = {};
            }
            this.options = Object.assign(settings, this.options);
            this.render();
        },
        render : function(){
            var element = document.querySelectorAll(this.options.selector);
            element.forEach(this.renderOne);
        },
        // render
        renderOne : function(element){
            // got corresponding library
            var lang = element.className.replace(/hl\-/, '');
            var candidates = this.library[lang];
            
            console.log()
        },
        library : {
            'javascript' : {
                'keyword' : ['if', 'else', 'while', 'switch', 'case', 'break', 'continue', 'do', 'for', 'var', 'new']
            }
        }
    };
    
    
    
    // init
    _H.init(settings);
    
};

