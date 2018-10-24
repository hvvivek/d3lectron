class Layer
{
    constructor(name)
    {
        this.name = name;
    }

    getView()
    {
        if(this.vizType)
        {

        }
        else
        {
            var layerView = $("<div id='LayerView'></div>")
            layerView.append("<p class='panel-title'>Select Template:</p><div id='Extensions'><select></select><p>&#8249;</p></div><div id='ExtensionView'></div>")
        }
        return layerView
    }

    getSVGGroup()
    {
        this.identifier = this.randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        if(!this.SVGgroup)
        {
            this.SVGgroup = d3.select("#canvas").append("g").attr("id", this.identifier)
        }
        
        return this.identifier
    }

    randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}