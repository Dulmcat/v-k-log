<template>
    <div class="warp">
        <ul class="list">
            <li v-for="item in articles" :key="item.id">
                <h1 class="title">
                    <router-link tag="span" :to="'articles/' + item._id">{{item.title}}</router-link>
                </h1>
                <div class="create-time">{{item.createTime}}</div>
                <p class="abstract" v-html="mark(item.abstract || '')">...</p>
                <p class="read-all">
                    <router-link tag="span" :to="'articles/' + item._id">查看全文</router-link>
                </p>
            </li>
        </ul>
        <ul class="pagination">
            <li @click="prew()">
                <span v-show="this.page !== 1">
                    <i class="el-icon-arrow-left"></i> 上一页</span>
            </li>
            <li>
                <router-link tag="span" to="archives">博客归档</router-link>
            <li @click="next()">
                <span v-show="this.articles.length >= 5"> 下一页 <i class="el-icon-arrow-right"></i> </span>
            </li>
        </ul>
    </div>
</template>

<script>
import marked from 'marked'
import Api from '../libs/Api'
export default {
    name: 'hello',
    data() {
        return {
            articles: [],
            page: 1,
            limit: 5
        }
    },
    created() {
        Api.getArticlesByPage(this.page, this.limit).then(res => {
            if (res.data.code === 200) {
                console.log(res.data.data);
                this.articles = res.data.data;
            }
        })
    },
    methods: {
        mark(value){
            return marked(value);
        },
        timeFix(value){
            return true;
        },
        prew(){
            this.page = this.page - 1;
            Api.getArticlesByPage(this.page, this.limit).then(res => {
                if (res.data.code === 200) {
                    this.articles = res.data.data;
                    console.log(res);
                }
            })
        },
        next() {
            this.page = this.page + 1;
            Api.getArticlesByPage(this.page, this.limit).then(res => {
                if (res.data.code === 200) {
                    this.articles = res.data.data;
                    console.log(res);
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/style/_setting";
.warp {
    min-height: calc(100% - 135px);
    .list {
        min-height: calc(100% - 135px);
        >li {
            border-bottom: 1px solid @border;
            .title {
                span {
                    border-bottom: 2px solid transparent;
                    cursor: pointer;
                    &:hover {
                        color: @green;
                        border-bottom: 2px solid @green;
                        transition: .25s;
                    }
                }
            }
            .create-time {
                color: @note;
            }
            .abstract {
                line-height: 1.5;
            }
            .read-all {
                span {
                    color: @green;
                    cursor: pointer;
                }
            }
        }
    }
    .pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 55px;
        li {
            color: @green;
            cursor: pointer;
            min-width: 72px;
        }
    }
}
</style>
