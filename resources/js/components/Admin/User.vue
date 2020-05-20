<template>
    <v-data-table
        :headers="headers"
        :items="this.getUsers"
        :loading="loadRow"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Пользователи</v-toolbar-title>

                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Добавить пользователя</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span v-if="!edit" class="headline">Новый пользователь</span>
<!--                            <span v-else class="headline">Редактировать пользователя</span>-->
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedUser.name" label="Имя"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
                                    </v-col>
                                    <v-col  cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedUser.password" label="Пароль"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="() => {
                                                                                dialog = !dialog;
                                                                                edit = false;
                                                                            }">
                                Cancel
                            </v-btn>
                            <v-btn v-if="!edit" color="blue darken-1" :loading="loading" :disabled="loading" text @click="save">
                                Save
                            </v-btn>
<!--                            <v-btn v-else color="blue darken-1" :loading="loading" :disabled="loading" text @click="update(editedUser.id)">-->
<!--                                Update-->
<!--                            </v-btn>-->
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
<!--            <v-icon-->
<!--                small-->
<!--                class="mr-2"-->
<!--                @click="showUser(item)"-->
<!--            >-->
<!--                mdi-account-edit-->
<!--            </v-icon>-->
            <v-icon
                small
                @click="deleteRow(item)"
            >
                mdi-delete
            </v-icon>
        </template>

    </v-data-table>
</template>

<script>var edit;

export default {
    name: "User",
    data() {
        return {
            loadRow: false,
            dialog: false,
            loading: false,
            edit: false,
            search: '',
            headers: [
                {
                    text: 'Имя',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {text: 'Email', value: 'email'},
                {text: 'Дата создания', value: 'created_at'},
                {text: 'Действия', value: 'action', sortable: false},
            ],
            users: [],
            editedUser: {
                id:'',
                name: '',
                email: '',
                password: '',
            }
        }
    },
    mounted() {
        axios.get(`${process.env.MIX_APP_URL}/api/users`)
            .then((response) => {
                this.users = response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    methods: {
        close() {
            this.dialog = false
        },

        save() {
            this.loading = !this.loading;
            axios.post(`${process.env.MIX_APP_URL}/api/users`,
                this.editedUser
            )
                .then((response) => {
                    this.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally((e) => {
                    this.loading = !this.loading;
                    this.editedUser = [];
                    this.close();
                });
        },

        update(id){
            this.loading = !this.loading;
            axios.put(`${process.env.MIX_APP_URL}/api/users/${id}`,
                this.editedUser
            )
                .then((response) => {
                    this.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally((e) => {
                    this.loading = !this.loading;
                    this.editedUser = [];
                    this.close();
                });
        },

        showUser(id){
            this.loadRow = !this.loadRow;
            axios.get(`${process.env.MIX_APP_URL}/api/users/${id.id}`)
                .then((response) => {
                    this.editedUser.id = response.data.id
                    this.editedUser.name = response.data.name
                    this.editedUser.email = response.data.email
                    this.editedUser.password = response.data.password

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally((e) => {
                    this.loadRow = !this.loadRow;
                    this.dialog = !this.dialog;
                    this.edit = true;
                });
        },

        deleteRow(id) {
            this.loadRow = !this.loadRow;
            axios.delete(`${process.env.MIX_APP_URL}/api/users/${id.id}`)
                .then((response) => {
                    this.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally((e) => {
                    this.loadRow = !this.loadRow;
                });
        },

    },
    computed: {
        getUsers() {
            return this.users;
        }
    }
}
</script>

<style scoped>

</style>
