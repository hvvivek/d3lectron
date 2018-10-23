class WorkspaceFile
{
    constructor(config)
    {
        this.name = config.name
        this.type = config.type
        this.full_path = config.path + "/" + config.name
        this.rString = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    }

    randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


    initDisplay()
    {
        switch(this.type)
        {
            case "csv":
                break;
            case "tsv":
                break;
            case "png":
                this.content = $("<img src='"+ this.full_path +"'>")
                break;
            case "jpg":
                break;
        }
    }

    getContent()
    {
        if(!this.content)
        {
            this.initDisplay()
        }

        return this.content;
    }
}