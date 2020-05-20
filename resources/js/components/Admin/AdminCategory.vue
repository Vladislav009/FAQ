<template>
    <v-data-table
        :headers="headers"
        :items="this.getCategory"
        :loading="loadRow"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Категории</v-toolbar-title>

                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Добавить категорию</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Новая категория</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedCategory.title" label="Нзвание"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" :loading="loading" :disabled="loading" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
            >
                mdi-account-edit
            </v-icon>
            <v-icon
                small
                @click="deleteRow(item)"
            >
                mdi-delete
            </v-icon>
        </template>

    </v-data-table>
</template>

<script>
    export default {
        name: "AdminCategory",
        data() {
            return {
                loadRow: false,
                dialog: false,
                loading: false,
                search: '',
                headers: [
                    {
                        text: 'Название',
                        value: 'title',
                    },
                    {text: 'Название', value: 'title'},
                ],
                categories: [],
                editedCategory: {
                    title: '',
                }
            }
        },
        mounted() {
            // axios.get(`${process.env.MIX_APP_URL}/api/users`)
            //     .then((response) => {
            //         this.users = response.data;
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     })
        },
        methods: {
            close() {
                this.dialog = false
            },

            save() {
                this.loading = !this.loading;
                // axios.post(`${process.env.MIX_APP_URL}/api/users`,
                //     this.editedUser
                // )
                //     .then((response) => {
                //         this.users = response.data;
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     })
                //     .finally((e) => {
                //         this.loading = !this.loading;
                //         this.editedUser = [];
                //         this.close();
                //     });
            },

            deleteRow(id) {
                this.loadRow = !this.loadRow;
                // axios.delete(`${process.env.MIX_APP_URL}/api/users/${id.id}`)
                //     .then((response) => {
                //         this.users = response.data;
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     })
                //     .finally((e) => {
                //         this.loadRow = !this.loadRow;
                //     });
            }
        },
        computed: {
            getCategory() {
                return this.categories;
            }
        }
    }
</script>

<style scoped>

</style>
