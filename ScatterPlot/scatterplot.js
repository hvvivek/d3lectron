class ScatterPlot
{
    constructor(config)
    {
        console.log(config)
        this.setConfig(config)

    }

    setConfig(config)
    {
        this.config     = config
        this.parent     = this.config.parent
        this.xFeature   = this.config.x
        this.yFeature   = this.config.y
        this.dataSource = workspace.data_sources[this.config.data]
        this.width      = this.config.width
        this.height     = this.config.height
        this.left      = parseInt(this.config.left)
        this.top     = parseInt(this.config.top)
        this.right      = parseInt(this.config.right)
        this.bottom     = parseInt(this.config.bottom)
        this.color      = this.config.color
        this.radius      = this.config.radius
        
        this.userSetRadius = false
        this.userSetFill = false

        console.log(this.color + " " + isColor(this.color))
        if(isColor(this.color))
        {
            this.userSetFill = true
        }

        if(isValidLength(this.radius))
        {
            this.userSetRadius = true
        }

        if(!isValidLength(this.left))
        {
            this.left = 0
        }

        if(!isValidLength(this.top))
        {
            this.top = 0
        }
    }

    init()
    {

    }

    build()
    {
        // $("#" + this.parent.getSVGGroup()).html("")
        console.log(this.parent.getSVGGroup())
        var plot = d3.select("#" + this.parent.getSVGGroup())
        console.log(plot)
        var data = this.dataSource.data
        var xFeature = this.xFeature
        var yFeature = this.yFeature

        console.log(data)

        var minx = d3.min(data, function(d){return parseInt(d[xFeature])})
        var maxx = d3.max(data, function(d){return parseInt(d[xFeature])})
        var miny = d3.min(data, function(d){return parseInt(d[yFeature])})
        var maxy = d3.max(data, function(d){return parseInt(d[yFeature])})

        console.log(minx + "-" + maxx + "-" + miny + "-" + maxy)

        console.log(parseInt(this.top))
        console.log(parseInt(this.left))
        this.xScale = d3.scaleLinear().domain([minx, maxx]).range([this.left, this.width - this.right])
        this.yScale = d3.scaleLinear().domain([miny, maxy]).range([this.height - this.bottom, this.top])
        console.log(this.xScale(20))
        console.log(this.yScale(20))

        var scatter = plot.selectAll("circle")
                            

        console.log(scatter)
        scatter.data(this.dataSource.data)
                .enter()
                .append("circle")
                .attr("r", this.getRadiusFunction())
                .attr("cx", this.getCxFunction())
                .attr("cy", this.getCyFunction())
                .attr("fill", this.getFillFunction())
                    
        
        scatter
            .attr("r", this.getRadiusFunction())
            .attr("cx", this.getCxFunction())
            .attr("cy", this.getCyFunction())
            .attr("fill", this.getFillFunction())

        scatter.exit().remove()

        this.plot = plot

    }

    getViz()
    {
        // if(!this.plot)
        // {
            this.build()
        // }

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
            console.log(this.radius)
            return this.radius
        }
    }

    getCxFunction()
    {
        var xScale = this.xScale
        var xFeature = this.xFeature
        // console.log(xFeature)
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
            console.log(this.color)
            return "red"
        }
        else
        {
            console.log(this.color)
            return this.color
        }
    }
}

