class ScatterPlot
{
    constructor(config)
    {
        console.log(config)
        this.config     = config
        this.parent     = this.config.parent
        this.xFeature   = this.config.x
        this.yFeature   = this.config.y
        this.dataSource = workspace.data_sources[this.config.data]
        this.width      = this.config.width
        this.height     = this.config.height

        this.userSetRadius = false
        this.userSetFill = false
    }

    init()
    {

    }

    build()
    {
        var plot = d3.select("#" + this.parent.getSVGGroup())
        var data = this.dataSource.data
        var xFeature = this.xFeature
        var yFeature = this.yFeature

        console.log(data)

        var minx = d3.min(data, function(d){return parseInt(d[xFeature])})
        var maxx = d3.max(data, function(d){return parseInt(d[xFeature])})
        var miny = d3.min(data, function(d){return parseInt(d[yFeature])})
        var maxy = d3.max(data, function(d){return parseInt(d[yFeature])})

        console.log(minx + "-" + maxx + "-" + miny + "-" + maxy)

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
        this.plot = plot
    }

    getViz()
    {
        if(!this.plot)
        {
            this.build
        }

        return this.plot
    }

    getRadiusFunction()
    {
        if(!this.userSetRadius)
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
        var xScale = this.xScale
        var xFeature = this.xFeature

        return function(d){return xScale(parseInt(d[xFeature]))}
    }

    getCyFunction()
    {
        var yScale = this.yScale
        var yFeature = this.yFeature

        return function(d){return yScale(parseInt(d[yFeature]))}
    }

    getFillFunction()
    {
        if(!this.userSetFill)
        {
            return "red"
        }
        else
        {
            return "red"
        }
    }
}

