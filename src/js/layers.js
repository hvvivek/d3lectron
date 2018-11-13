class Layer
{
    constructor(name)
    {
        this.name = name;
        this.visibility = true
        this.color = Layer.getColor()
    }

    getView()
    {

        console.log(d3.keys(extensions)[0])

        var layerView = $("<div id='LayerView'></div>")
        var extension = this.extension
        layerView.load("./snippets/layer_panel.html", function()
        {
            Layer.addTemplate("#templates")
            if(extension)
            {
                layerView.find(".extension-view").append(extension.getView(extension.path))
                // console.log(extension.getView(extension.path))
                // console.log(layerView.get())
            }
        })

        


        return layerView

        if(!this.templates)
        {
            this.templates = []   
            this.templates.push(new Template(extensions[d3.keys(extensions)[0]]))         
        }
        return this.templates[0].getView()

        if(!this.vizType)
        {
            var layerView = $("<div id='LayerView'></div>")
            layerView.load("./snippets/layer_panel.html", function()
            {
                Layer.addTemplate("#templates")
            })
            // layerView.append("<p class='panel-title'>Select Template:</p><div id='Extensions'><select></select><p>&#8249;</p></div><div id='ExtensionView'></div>")
            this.vizType = layerView
        }
        return this.vizType
    }

    getSVGGroup()
    {
        if(!this.SVGgroup)
        {
            this.identifier = randomString(10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            this.SVGgroup = d3.select("#canvas").append("g").attr("id", this.identifier)
        }
        
        return this.identifier
    }

    getWidth()
    {
        return $("#canvas").width()
    }

    getHeight()
    {
        return $("#canvas").height()
    }

    
    hideTemplates()
    {
        this.templateList.remove()
    }

    showTemplates()
    {
        if(this.templates)
        {
            console.log(this.templateList)
            var list = this.templateList.find("ul")
            list.html("")

            
            for(var i=0; i<this.templates.length; i++)
            {
                var eye_class  = this.visibility?"":"hidden"
                var lock_class = this.locked?"":"hidden"

                var eye = $("<div class='icon-container'></div>").append($("<img></img>").attr("src", "./assets/eyecon.png").attr("class", "eye " + eye_class))
                var lock = $("<div class='icon-container'></div>").append($("<img></img>").attr("src", "./assets/layerLock.png").attr("class", "lock " + lock_class))
                
                var wrapper = $("<li data-template-id="+i+"></li>")
                wrapper.append(eye)
                wrapper.append(lock)
                wrapper.append("<p>" + this.templates[i].name +"</p>")


                var layer = workspace.layers[$(this.templateList).attr("data-layer-id")]
                var template = layer.getTemplate(i)

                eye.find("img").attr("data-hide-id", template.getSVGGroup())
                eye.find("img").on("click", function(e)
                {
                    console.log("Here")
                    $(this).toggleClass("hidden")
                    if($(this).hasClass("hidden"))
                    {
                        $("#" + $(this).attr("data-hide-id")).toggleClass("hidden", true)
                    }
                    else
                    {
                        $("#" + $(this).attr("data-hide-id")).toggleClass("hidden", false)
                    }
                    e.stopPropagation()
                })

                wrapper.on("click", function()
                {
                    
                    var id = $(this).attr("data-template-id")
                    workspace.activeTemplateId = id
                    console.log(id)
                    var layer = workspace.layers[$(this.parentNode.parentNode).attr("data-layer-id")]
                    console.log(layer)
                    var template = layer.getTemplate(id)
                    
                    console.log(template)
                    // console.log(template.getView().html())
                    $("#LayerView").html("")
                    $("#LayerView").append(template.getView())
                })
                // wrapper.append(caret)

                list.append(wrapper)
            }
            this.listView.find(".caret").toggleClass("expanded", true)
            this.listView.after(this.templateList)
        }
    }

    addTemplate(object)
    {
        if(!this.templates)
        {
            this.templates = []
        }
        this.templates.push(object)

        this.showTemplates()
        console.log(this.templates)
    }

    getTemplate(id)
    {
        if(!this.templates)
        {
            this.templates = []
        }
        return this.templates[id]
    }

    setVisible(isVisible)
    {
        this.visibility = isVisible
    }

    setLocked(isLocked)
    {
        this.locked = isLocked
    }
    
    getListView()
    {
        if(!this.listView)
        {
            var eye_class  = this.visibility?"":"hidden"
            var lock_class = this.locked?"":"hidden"
            var caret_class = this.expanded?"expanded":"collapsed"

            var listView = $("<li class='layer-name'></li>")
            var eye = $("<div class='icon-container'></div>").append($("<img></img>").attr("src", "./assets/eyecon.png").attr("class", "eye " + eye_class))
            var lock = $("<div class='icon-container'></div>").append($("<img></img>").attr("src", "./assets/layerLock.png").attr("class", "lock " + lock_class))
            var caret = $("<div class='icon-container'></div>").append($("<img class='expanded'></img>").attr("src", "./assets/layerCaret.png").attr("class", "caret " + caret_class))
            
            listView.attr("data-layer-id", this.name.replace(/ /g,''))

            listView.append(eye)
            listView.append(lock)
            listView.append(caret)

            listView.append("<div class='layer-name-container' style='border-left: 4px solid " + this.color + "'><p>" + this.name + "<div></p>")
            
            
            var templateList = $("<li class='templates' data-layer-id='"+ this.name.replace(/ /g,'') +"'><ul></ul></li>")
            if(this.templates)
            {
                for(var i=0; i<this.templates.length; i++)
                {
                    templateList.append("<li>" + this.templates[i].name + "</li>")
                }
            }

            
            // listView.after(templateList)
            this.templateList = templateList
            this.listView = listView
        }
        return this.listView
    }

    static addTemplate(id)
    {
        var templateView = $("<div></div>").load("./snippets/template_snippet.html", function()
        {
            
            // console.log(templateView)
            // templateView.find("select").html("")
            // templateView.find("select").append("<option>Custom</option>")
            var count = 1
            for(var extension in extensions)
            {
                console.log(count++)
                templateView.find(".extensions").append("<button class='template-button' data-extension-id='" + extension + "'><img src='" + extensions[extension].icon + "'></button>")
                // templateView.find("select").append("<option>" + extension + "</option>")
            }
            
            templateView.find(".template-button").on("click", function()
            {
                var extension = extensions[$(this).attr("data-extension-id")]
                var template = new Template($(this).attr("data-extension-id"), getActiveLayer(), extension)
                getActiveLayer().addTemplate(template)
                // $(this.parentNode.parentNode).find(".extension-view").html("")
                // $(this.parentNode.parentNode).find(".extension-view").append(template.getView())
            })
        })
        
        $(id).append(templateView)
    }

    

    static getColor()
    {
        if(!workspace.colors)
        {
            workspace.colors = []
        }

        var new_color = '#ff0000';
        while(workspace.colors.indexOf(new_color) >= 0 )
        {
            new_color = getRandomColor()
        }

        workspace.colors.push(new_color)
        return new_color
    }

    
}