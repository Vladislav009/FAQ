<template>
    <v-container>
        <v-row>
            <v-col lg="6">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        v-model="email"
                        label="E-mail"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        label="Password"
                    ></v-text-field>
                    <v-alert v-if="serverErrors.length > 0" class="mt-5" outlined type="error" >
                        {{this.serverErrors[0].message}}
                    </v-alert>
                    <v-btn
                        :loading="loading"
                        :disabled="loading || !valid"
                        color="success"
                        class="mr-4 mt-4"
                        @click="login()"
                    >
                        Login
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import { required, minLength, email } from 'vuelidate/lib/validators'
    export default {
        name: "Login",
        data: () => ({
            loading: false,
            valid: true,
            email: '',
            password: '',
            errors:[]
        }),
        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4)
            }
        },
        methods: {
            login() {
                this.loading = !this.loading;
                axios.post(`${process.env.MIX_APP_URL}/api/login`,
                    {
                        email: this.email,
                        password: this.password
                    }
                )
                    .then((response) => {
                        if(response.data.status){
                            this.$store.commit('setUser', response.data);
                            document.cookie = `token = ${this.$store.state.auth_user.token}`;
                        }else{
                            this.errors.push(response.data);
                        }

                    })
                    .catch(function (error) {
                        console.error(error);
                    })
                    .finally((e) => {
                        this.loading = !this.loading;
                        if(this.$store.state.is_login){
                            this.$router.push('admin')
                        }else{
                            this.$router.push('login')
                        }
                    });
            }
        },
        computed:{
            emailErrors () {
                const errors = [];
                if (!this.$v.email.$dirty){
                    this.valid = false
                    return errors
                }
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                this.valid = false
                return errors
            },
            passwordErrors () {
                const errors = [];
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.minLength && errors.push('Must be 4 sym or more')
                !this.$v.password.required && errors.push('Password is required')
                return errors
            },
            serverErrors() {
                return this.errors;
            }
        }
    }
</script>

<style scoped>

</style>
