class ScatterPlot
{
    constructor(config)
    {
        this.config     = config
        this.parent     = this.config.layer
        this.xFeature   = this.config.xFeature
        this.yFeature   = this.config.yFeature
        this.dataSource = this.config.dataSource
        this.width      = this.config.width
        this.height     = this.config.height
    }

    init()
    {

    }

    build()
    {
        var plot = d3.select(parent)
        var data = this.dataSource.data
        var xFeature = this.xFeature
        var yFeature = this.yFeature

        var minx = d3.min(data, function(d){return d[xFeature]})
        var maxx = d3.max(data, function(d){return d[xFeature]})
        var miny = d3.min(data, function(d){return d[yFeature]})
        var maxy = d3.max(data, function(d){return d[yFeature]})

        this.xScale = d3.scaleLinear().domain([minx, maxx]).range([0, this.width])
        this.yScale = d3.scaleLinear().domain([miny, maxy]).range([this.height, 0])

        plot.selectAll("circle")
            .data(this.dataSource.data)
            .enter()
                .append("circle")
                .attr("r", this.getRadiusFunction())
                .attr("cx", this.getCxFunction())
                .attr("cy", this.getCyFunction())
                .attr("fill", this.getFillFunction())
    }

    getRadiusFunction()
    {
        if(!userSetRadius)
        {
            return "1px"
        }
        else
        {
            return "1px"
        }
    }

    getCxFunction()
    {
        return function(d){return this.xScale(d[this.xFeature])}
    }

    getCyFunction()
    {
        return function(d){return this.yScale(d[this.yFeature])}
    }

    getFillFunction()
    {
        if(!userSetFill)
        {
            return "black"
        }
        else
        {
            return "black"
        }
    }
}