<template>
    <v-container fluid>
        <v-row>
            <v-col
                lg="6"
            >
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        v-model="name"
                        label="Name"
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        label="E-mail"
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        label="Password"
                    ></v-text-field>

                    <v-btn
                        color="success"
                        class="mr-4"
                        @click="register()"
                        :loading="loading"
                        :disabled="loading"
                    >
                        Add
                    </v-btn>
                    <v-snackbar
                        v-model="snackbar"
                    >
                        {{ text }}
                        <v-btn
                            color="pink"
                            text
                            @click="snackbar = false"
                        >
                            Close
                        </v-btn>
                    </v-snackbar>
                </v-form>
            </v-col>

        </v-row>
    </v-container>

</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "Registration",
        data: () => ({
            valid: true,
            name: '',
            email: '',
            password: '',
            snackbar: false,
            text: '',
            loading: false,
        }),
        methods: {
            register() {
                this.loading = !this.loading;
                axios.post(`${process.env.MIX_APP_URL}/api/register`, {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                    .then(function (response) {
                        console.log(response.status);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(() => {
                        this.loading = !this.loading;
                        this.snackbar = !this.snackbar;
                        this.text = 'Пользователь успешно добавлен'
                        this.snackbar = !this.snackbar;
                    });
            }
        },
        validations: {
            name: {
                required,
            },
            email: {
                required,
            },
            password: {
                required,
                minLength: minLength(8)
            },

        }
    }
</script>

<style scoped>

</style>
