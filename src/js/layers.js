class Layer
{
    constructor(name)
    {
        this.name = name;
        this.visibility = true
    }

    getView()
    {
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

    

    addTemplate(id, object)
    {
        if(!this.templates)
        {
            this.templates = {}
        }
        this.templates[id] = object
    }

    getTemplate(id)
    {
        if(!this.templates)
        {
            this.templates = {}
        }
        return this.templates[id]
    }

    setVisible(isVisible)
    {
        this.visibility = isVisible
    }
    
    static addTemplate(id)
    {
        var templateView = $("<div></div>").load("./snippets/template_snippet.html", function()
        {
            // console.log(templateView)
            templateView.find("select").html("")
            templateView.find("select").append("<option>Custom</option>")

            for(var extension in extensions)
            {
                templateView.find("select").append("<option>" + extension + "</option>")
            }
            
            templateView.find("select").on("change", function()
            {
                console.log(this)
                var extension = extensions[$(this).val()]
                console.log(this.parentNode)
                // window[extension.functions].getView(extension.full_path)
                $(this.parentNode.parentNode).find(".extension-view").html("")
                $(this.parentNode.parentNode).find(".extension-view").append(extension.getView(extension.path))
            })
        })
        
        $(id).append(templateView)
    }

    
}