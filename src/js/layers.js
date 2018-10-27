class Layer
{
    constructor(name)
    {
        this.name = name;
    }

    getView()
    {
        if(!this.vizType)
        {
            var layerView = $("<div id='LayerView'></div>")
            layerView.append("<p class='panel-title'>Select Template:</p><div id='Extensions'><select></select><p>&#8249;</p></div><div id='ExtensionView'></div>")
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

    

    addTemplate(id, object)
    {
        if(!this.templates)
        {
            this.templates = {}
        }
        this.templates[id] = object
    }
}