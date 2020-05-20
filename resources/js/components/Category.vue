<template>
    <div>
        <div v-for="item in getTest">
            {{item.asd}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Category",
        data: () => ({
            messages: [
                {
                    asd: '123',
                    asdasd: 'asdasd'
                },
                {
                    asd: '123',
                    asdasd: 'asdasd'
                }
            ]

        }),
        computed:{
            getTest(){
                return this.messages;
            }
        }
    }
</script>

<style scoped>

</style>
