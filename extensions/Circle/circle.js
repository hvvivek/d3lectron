class Circle
{
    constructor(config)
    {
        this.setConfig(config)
    }

    static build(config_container)
    {
        var config = {}
        config.r = $(config_container + " input[name=r]").val()
        config.cx = $(config_container + " input[name=cx]").val()
        config.cy = $(config_container + " input[name=cy]").val()
        config.parent = getActiveLayer()
        var id = randomString(5)
        config.id = id
        config.parent.addTemplate(id, new Circle(config))
        config.parent.getTemplate(id).compile()
    }

    setConfig(config)
    {
        this.config = config
        this.r = config.r
        this.cx = config.cx
        this.cy = config.cy
        this.parent = config.parent
    }

    compile()
    {
        var plot = d3.select("#" + this.parent.getSVGGroup())

        // var xFeature = this.xFeature
        // var yFeature = this.yFeature

       
        // this.xScale = d3.scaleLinear()
        //                 .domain(getDomain(xFeature))
        //                 .range([this.left, this.width - this.right])

        // this.yScale = d3.scaleLinear()
        //                 .domain(getDomain(yFeature))
        //                 .range([this.height - this.bottom, this.top])

        var canvas = plot
                
        console.log(canvas)
        canvas
            // .data(this.dataSource.data)
            // .enter()
                .append("circle")
                .attr("r",      this.getRadiusFunction())
                .attr("cx",     this.getCxFunction())
                .attr("cy",     this.getCyFunction())
                    
        // canvas
        //     .attr("r",      this.getRadiusFunction())
        //     .attr("cx",     this.getCxFunction())
        //     .attr("cy",     this.getCyFunction())

        // canvas
        //     .attr("fill",   this.getFillFunction())


        // canvas
        //     .exit()
        //     .remove()
    }

    getRadiusFunction()
    {
        console.log(this.r)
        return this.r
    }

    getCxFunction()
    {
        return this.cx
    }

    getCyFunction()
    {
        return this.parent.getHeight() - this.cy
    }

    // getFillFunction()
    // {
    //     return this.fill
    // }


    //Utility functions
    getDomain(feature)
    {
        var data = this.dataSource.data
        var min = d3.min(data, function(d){return parseInt(d[feature])})
        var max = d3.max(data, function(d){return parseInt(d[feature])})
        return [min, max]
    }
}


