const Tag = require('../models/index').tag;

// 添加tag-->如果该tag已存在就不再新建
const addTag = async (ctx) => {
    const name = ctx.request.body.name;
    if (!name) {
        ctx.throw(400, '标签不能为空');
    }
    let isExist = await Tag.findOne({ name }).exec().catch(err => {
        ctx.throw(500, '服务器错误-->数据库查询单一tag出错');
    });
    if (isExist !== null) {
        return ctx.body = {
            code: 0,
            msg: '此标签已存在！',
            data: isExist
        };
    }
    let tag = new Tag({
        name
    });
    let result = await tag.save().catch(err => {
        ctx.throw(500, '服务器错误-->数据库创建tag出错');
    });
    return ctx.body = {
        code: 200,
        msg: '标签创建成功！',
        data: result
    }
};

//删除标签
const delTag = async (ctx) => {
    const id = ctx.params.id;
    let result = await Tag.findByIdAndRemove(id).exec().catch(err => {
        ctx.throw(500, '服务器错误-->数据库删除tag出错');
    });
    return ctx.body = {
        code: 200,
        msg: '删除标签成功！',
        data: result
    }
};

//修改标签
const editTag = async (ctx) => {
    const id = ctx.params.id;
    let name = ctx.request.body.name;
    if (!name) {
        ctx.throw(500, '标签类型不能为空！');
    }
    let oldResult = await Tag.findById(id).catch(err => {
        ctx.throw(500, '服务器错误-->查询修改前tag出错');
    });
    let result = await Tag.findByIdAndUpdate(id, { name }, { new: true }).exec().catch(err => { // 添加{new: true}用来返回新的tag
        ctx.throw(500, '服务器错误-->修改tag出错');
    });
    console.log(result);
    return ctx.body = {
        code: 200,
        msg: '修改标签成功！',
        data: result,
        oldData: oldResult
    }
};

// 获得所有标签
const getAllTags = async (ctx) => {
    let result = await Tag.find().catch(err => {
        ctx.throw(500, '服务器错误-->数据库查询所有tag出错');
    });
    return ctx.body = {
        code: 200,
        msg: '所有标签获得成功！',
        data: result
    };
};

module.exports = {
    addTag,
    delTag,
    editTag,
    getAllTags
};

