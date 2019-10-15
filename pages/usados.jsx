import Link from 'next/link'

export default class extends React.Component{

    static async getInitialProps(res, props){
        try {
            let response = await fetch('https://ecuador.patiotuerca.com/ptx/api/v2/nitros?type=Autos&brand=chevrolet&model=aveo&subtype=&count=4');
            let vehicles = await response.json();
            return {vehicles : vehicles.data.result_set, statusCode:200 }
        } catch (error) {
            res.statusCode = 503
            return {channels: null, statusCode:503}
        }
    }

    render() {
        console.log(this.props);
        
        const {vehicles} = this.props;
        console.log("vehiculos: ", this.props);
        // <Link route='channel' params={{slug:slug(channel.title), id:channel.id}} prefetch></Link>
      return (
        <div className="channels">
          {vehicles.map((vehicle, i) => (
            <Link href="usados" as={vehicle.VehicleLink} key={i}>
              <a className="channel">
                <img src={vehicle.ImageUrl} alt="" />
                <h2>{vehicle.ModelValue+" "+vehicle.SubtypeValue}</h2>
              </a>
            </Link>
          ))}
          <style jsx>{`
              .channels {
                display: grid;
                grid-gap: 15px;
                padding: 15px;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
              }
              a.channel {
                display: block;
                margin-bottom: 0.5em;
                color: #333;
                text-decoration: none;
              }
              .channel img {
                border-radius: 3px;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
                width: 100%;
              }
              h2 {
                padding: 5px;
                font-size: 0.9em;
                font-weight: 600;
                margin: 0;
                text-align: center;
              }
            `}
          </style>
        </div>
      );
    }
}