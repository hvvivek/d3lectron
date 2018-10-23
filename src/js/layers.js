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
            layerView.append("<select></select>")
        }
        return layerView
    }
}