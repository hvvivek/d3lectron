class Rect
{
    constructor(config)
    {
        this.setConfig(config)
    }

    static build(config_container)
    {
        var config = {}
        config.width = $(config_container).find("input[name=width]").val()
        config.height = $(config_container).find("input[name=height]").val()
        config.x = $(config_container).find("input[name=x]").val()
        config.y = $(config_container).find("input[name=y]").val()
        config.parent = getActiveLayer()
        var id = randomString(5)
        config.id = id
        config.parent.addTemplate(id, new Rect(config))
        config.parent.getTemplate(id).compile()
    }

    setConfig(config)
    {
        this.config = config
        this.width = config.width
        this.height = config.height
        this.x = config.x
        this.y = config.y
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
                
        // console.log(canvas)
        canvas
            // .data(this.dataSource.data)
            // .enter()
                .append("rect")
                .attr("width",      this.getWidthFunction())
                .attr("height",      this.getHeightFunction())
                .attr("x",     this.getXFunction())
                .attr("y",     this.getYFunction())
                    
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

    getWidthFunction()
    {
        return this.width
    }

    getHeightFunction()
    {
        return this.height
    }

    getXFunction()
    {
        return this.x
    }

    getYFunction()
    {
        return this.parent.getHeight() - this.y
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



