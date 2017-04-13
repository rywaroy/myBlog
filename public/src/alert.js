module.exports = window.Prompt = function(options){
    var cancelFlag = false;
    var titleFlag = false;
    if(options){
        options.content||(options.content = 'default content');
        options.okCallback||(options.okCallback = function(){
            console.log('ok chosen!');
        });
        if(options.cancelCallback){
            cancelFlag = true;
        };
        if(options.title){
            titleFlag = true;
        };
    }else{
        var options={
            title:'this is default title',
            content: 'this is default content',
            okCallback: function(){
                console.log('ok clicked!');
            },
            cancelCallback: function(){
                console.log('cancel clicked!');
            }
        }
        cancelFlag = true;
        titleFlag = true;
    };
    // debugger;
    var shade = document.createElement('div');
    shade.setAttribute('style', 'background-color:rgba(0,0,0,0.6); width:100%; height: 100%; position:absolute; left:0; top:0; z-index:1024;')
    shade.classList.add('shade');
    var prompt = document.createElement('div');
    prompt.setAttribute('style', 'position:absolute; margin:auto; left:0; right:0; top:0; bottom:0; width:6rem; height:3rem; background-color:#fff; z-index:1025; transition: all .3s ease; box-sizing: content-box; padding: 0.2rem; border-radius: 10px; opacity: 0; ');
    var innerPrompt = document.createElement('div');
    innerPrompt.setAttribute('style', 'height:100%; width:100%; text-align: center; font-size: 0.3rem; ');
    innerPrompt.classList.add('innerPrompt');

    if(titleFlag){
        var title = document.createElement('p');
        title.innerHTML = options.title;
        innerPrompt.appendChild(title);
    };

    var content = document.createElement('p');
    content.innerHTML = options.content;
    innerPrompt.appendChild(content);

    function modualRemoval(){
        document.body.removeChild(shade);
        var others = document.querySelectorAll('body > *');
        [].forEach.call(others, function(elem){
            if(elem.nodeName != 'SCRIPT'){
                elem.style.webkitFilter = '';
            }
        });
    };

    var buttonWrapper = document.createElement('div');

    var okBtn = document.createElement('button');
    okBtn.innerHTML = '确定';
    okBtn.addEventListener('click', function(event){
        options.okCallback();
        modualRemoval();
        event.stopPropagation();
    });
    buttonWrapper.appendChild(okBtn);

    if(cancelFlag){
        var cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = '取消';
        cancelBtn.addEventListener('click', function(event){
            options.cancelCallback();
            modualRemoval();
            event.stopPropagation();
        });
        buttonWrapper.appendChild(cancelBtn);
    }
    innerPrompt.appendChild(buttonWrapper);

    prompt.appendChild(innerPrompt);
    shade.appendChild(prompt);
    document.body.appendChild(shade);
    setTimeout(function(){
        var others = document.querySelectorAll('body > *:not(.shade)');
        [].forEach.call(others, function(elem){
            if(elem.nodeName != 'SCRIPT'){
                elem.style.webkitFilter = 'blur(6px)';
            }
        })
        prompt.style.opacity = 1;
        prompt.style.padding = 0;
    }, 50);
    prompt.addEventListener('click', function(event){
        event.stopPropagation();
    });
    shade.addEventListener('click', function(event){
        modualRemoval();
    });
}
