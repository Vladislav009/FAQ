<template>
    <div>
        <v-toolbar>
            <v-toolbar-items>
                <v-btn text color="primary">
                    <router-link to="/admin/ad_category">Категории</router-link>
                </v-btn>
                <v-btn text color="primary">
                    <router-link to="/admin/ad_question">Вопросы</router-link>
                </v-btn>
                <v-btn text color="primary">
                    <router-link to="/admin/user">Пользователи</router-link>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        data: () => ({

        }),
    }
</script>

<style scoped>

</style>
