import { Auth } from "aws-amplify";


export const auth = {

    namespaced: true,
    state: { user: null },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async logout({ commit }) {
            commit("setUser", null);
            return await Auth.signOut()
                .then(data => console.log(data))
                .catch(err => console.log(err));
        },
        async login({ commit }, { username, password }) {
            try {
                await Auth.signIn(username, password)
                    .then(user => console.log(user))
                    .catch(err => console.log(err));

                const userInfo = await Auth.currentUserInfo()
                commit("setUser", userInfo);
                return Promise.resolve("Success");
            } catch (error) {
                console.log(error)
                return Promise.reject(error)
            }
        },
        async confirmSignUp(_, { username, code }) {
            try {
                await Auth.confirmSignUp(username, code);
                return Promise.resolve()

            } catch (error) {
                console.log(error)
                return Promise.reject(error)

            }
        },
        async signUp(_, { username, password, email }) {
            try {
                await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email,             // optional
                        // Other custom attributes...
                    },
                })
                return Promise.resolve()

            } catch (error) {
                console.log(error)
                return Promise.reject(error)

            }
        },
        async authAction({ commit }) {
            const userInfo = await Auth.currentUserInfo()
            commit("setUser", userInfo);
        }
    },
    getters: {
        user: (state) => state.user

    }

}