class Template
{
    constructor(name, parent, extension)
    {
        this.name = name
        this.parent = parent
        this.setExtension(extension)
    }

    setExtension(extension)
    {
        this.extension = extension
    }

    getView()
    {
        if(!this.layerView)
        {
            var layerView = $("<div id='extension-view'></div>")
            var extension = this.extension
            layerView.append(extension.getView(extension.path))
            this.layerView = layerView
        }
        return this.layerView
    }

    compile(object)
    {
        this.object = object
        object.compile()
    }

    getSVGGroup()
    {
        if(!this.SVGgroup)
        {
            this.identifier = randomString(10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            this.SVGgroup = d3.select("#" + this.parent.getSVGGroup()).append("g").attr("id", this.identifier)
        }
        console.log(this.identifier)
        return this.identifier
    }
}