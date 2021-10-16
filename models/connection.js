
const {v4: uuidv4} = require('uuid');

const connect = [{ id:'0',name:'Ethereum Mainnet Reveal', topic:'Crypto Conventions', details:'Ethereum Mainnet discussions pertaining to latest installation and latest projects coming to Ethereum.',date:'2021-08-29', startTime:'19:30',endTime:'01:00',hostName:'Chris Epsilon',image:'https://m.economictimes.com/thumb/msid-82771896,width-1200,height-900,resizemode-4,imgsize-312033/crypto-currency.jpg' }, 
               { id:'1',name:'Solana Latest NFTs Insider', topic:'Crypto Conventions', details:'Latest news releases breakdowns and a deep dive into hottest Solona NFT projects',date:'2021-09-05', startTime:'01:30',endTime:'05:30',hostName:'Mark Jacobs',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMDaK44varAVwNOcd0EFPcoC9QaTDylA088oeoCS49m17HgEROxjPqoC_Bc8a-iSUHTA&usqp=CAU' },
               { id:'2',name:'Cardano - A look into the future', topic:'Crypto Conventions', details:"Cardano ecosystem and projects soon to be completed. Discussion on expectations of projects, cardano's future and more.",date:'2021-09-07', startTime:'10:30',endTime:'15:30',hostName:'Mike Fisher',image:'https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvYjJkNzNmNmQtZWFlNi00NWJlLWEyMDAtYWFhMTgyODZlYjI5LmpwZw==.jpg' },

               { id:'3',name:" Mill's Creek School computer donation", topic:'Crypto Givebacks/ Community Service', details:"Make a donation that lasts. CryptoConnects will be collecting crypto donation deposits to purchase computers, which will be gifted to Mill's Creek School.",date:'2021-09-15', startTime:'03:40',endTime:'06:00',hostName:'Luke Zakerman',image:'https://herostocks.ca/wp-content/uploads/2019/07/investingINnCryptooo.jpg' },
               { id:'4',name:'$100,000 Monthly Give-away Donation Pool', topic:'Crypto Givebacks/ Community Service', details:"Every month we will be selecting two lucky winners to recieve a donation of $100,000. Register and don't miss out on this once in a lifetime opportunity",date:'2021-10-05', startTime:'10:30',endTime:'06:00',hostName:'Vivivian Westwood',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZk05Qi7esTro-A1oxQVpU3XBYVh7fTlM420bJ9_vbUNpb6gE4XIM2vg6t6plakBAdVLY&usqp=CAU' },
               { id:'5',name:'Crypto Education Day with kids', topic:'Crypto Givebacks/ Community Service', details:'Join us for an educational day at South Creek School, where we will be spreading crypto knowledge and awareness.',date:'2021-10-29', startTime:'10:30',endTime:'18:00',hostName:'Soritoni Viche',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4qd4I0x8dRSeV8-SmYpa91HhgwtiXt1IznQ&usqp=CAU' }
];


exports.find = () => connect;

exports.findById = function(id){
 
    return connect.find(c => c.id == id);
 }



exports.save = function(connection) {

    connection.id = uuidv4();

    connect.push(connection);
} 

exports.updateById = function(id, newConnect){
    let connection = connect.find(c => c.id == id);
    if(connection){
        connection.name = newConnect.name;
        connection.topic = newConnect.topic;
        connection.details = newConnect.details;
        connection.date = newConnect.date;
        connection.startTime = newConnect.startTime;
        connection.endTime = newConnect.endTime;
        connection.hostName = newConnect.hostName;
        connection.image = newConnect.image;
        return true;
    } else {
        return false;
    }
    
}

exports.deleteById = function(id) {
    let index = connect.findIndex(c => c.id === id);

    if(index !== -1){
       connect.splice(index,1);
       return true;
    }else{
        return false;
    }
}