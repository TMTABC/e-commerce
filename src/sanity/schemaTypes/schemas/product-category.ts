import {defineField, defineType} from "@sanity/types";

const productCategory = defineType({
    name: "productCategory",
    title:"ProductCategory",
    type:"document",
    fields:[
        defineField({
            name:"title",
            title:"Title",
            type:"string",
        }),
        defineField({
            name:"description",
            title:"Description",
            type:"text",
        }),
        defineField({
            name:"slug",
            title:"Slug",
            type:"slug",
        }),
    ]
})

export default productCategory;