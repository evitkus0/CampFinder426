<template>
    <div v-if="this.admin">
        <ApprovalCard v-for="(program, index) in programs"
                    v-bind:program="program"
                    v-bind:index="index"
                    v-bind:key="index">
        </ApprovalCard>
    </div>
    <div v-else>
        <h1>You don't belong here! Go home.</h1>
    </div>
</template>

<script>
    import firebase from "firebase";
    import ApprovalCard from "../components/ApprovalCard.vue";
    import { mapState } from "vuex";

    export default {
        name: "AdminPortal",
        data: () => ({
            programs: []
        }),
        components: {
            ApprovalCard
        },
        computed: {
            ...mapState(["admin"]),
        },
        methods: {
            fetchPrograms() {
                if(this.admin) {
                let vm = this;
                let db = firebase.firestore();
                db.collection("programs").where("approved", "==", false).get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                                vm.programs.push(doc.data());
                        });
                    });
            }
            }
        },
    created() {
        this.fetchPrograms();
    },
    }
</script>

<style scoped>

</style>