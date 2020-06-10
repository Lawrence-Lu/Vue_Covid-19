<template>
    <div>
    <table>
        <tr>
            <td>编号</td>
            <td>书名</td>
            <td>作者</td>
        </tr>
        <tr v-for="item in books" :key="item">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.author}}</td>
        </tr>
    </table>
    {{msg}}
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Book",
    data(){
        return{
            msg: "Hello Vue",
            books:[
                {id:1,
                name:'Java',
                author: 'ZhangSan'
                },
                {id: 2,
                name:'Vue',
                author: 'LiSi'}
            ]
        }
     }
     ,
    // created(){
    //     axios.get("../../static/data.json").then(function (resp){
    //         console.log(resp)
    //     })
    // }
    
}
</script>>