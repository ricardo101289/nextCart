import 'isomorphic-fetch';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error'

export default class extends React.Component {

    static async getInitialProps(res){
        try {
            let req = await fetch('https://api.audioboom.com/channels/recommended?api_version=2');
            let {body: channels} = await req.json();


            let response = await fetch('https://ecuador.patiotuerca.com/ptx/api/v1/featured-brands');
            let vehicles = await response.json();



            return {channels, statusCode:200, vehicles : vehicles.data }
        } catch (error) {
            res.statusCode = 503
            return {channels: null, statusCode:503}
        }
    }

    render() {
        console.log(this.props);
        
        const {channels, statusCode, vehicles} = this.props;
        if (statusCode !== 200) {
            return <Error statusCode = {statusCode}/>
        }
        return (
            <Layout title ="App de podcasts">
                <ChannelGrid channels={channels} vehicles={vehicles}></ChannelGrid>
            </Layout>
        );
    }
}