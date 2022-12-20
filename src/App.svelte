<script lang="ts">

    import Index from "./views/Mission/Index.svelte";
    import Store from "./views/Mission/Store.svelte";
    import Test from "./views/Mission/Test.svelte";
    import {Route, Router} from "svelte-navigator";
    import Tabbar from "./components/Tabbar.svelte";

</script>
<Router>
    <main>


        <Route path="/index">
            <Index/>
        </Route>

        <Route path="/">
            <Index/>
        </Route>
        <Route path="/store">
            <Store/>
        </Route>
        <Route path="/test">
            <Test/>
        </Route>
        <Tabbar></Tabbar>
    </main>

</Router>
<style>

</style>
