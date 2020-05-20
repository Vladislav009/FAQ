<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            app
        >
            <v-list dense>
                <router-link to="/">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-home-export-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Домой
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/category">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-view-list</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Выбрать категорию
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/question">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-tooltip-plus-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Задать вопрос</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </router-link>

            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="indigo"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>
                F&Q
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn v-if="getStatus" @click="logout()"  icon>
                <v-icon>mdi-logout</v-icon>
            </v-btn>

            <v-btn v-else  @click="() => (this.$router.push('login'))"  icon>
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>

        <v-footer
            color="indigo"
            app
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>

    export default {
        name: "App",
        data: () => ({

            drawer: null
        }),
        computed:{
            getStatus(){
                return this.$store.getters.getStatus
            }
        },
        methods:{
            logout(){
                this.$store.commit('logout');
                this.$router.push('login')
            }
        },
        created: async function () {
            try{
                if($cookies.get('token')){
                    await this.$store.dispatch('getUser', $cookies.get('token'));
                }
            }catch (e) {
                console.log(e)
            }finally {

            }
        }
    }
</script>

<style scoped>
    a:hover {
        text-decoration: none;
    }

    .router-link-exact-active > .v-list-item {
        background-color: #9898983b;
    }

</style>
