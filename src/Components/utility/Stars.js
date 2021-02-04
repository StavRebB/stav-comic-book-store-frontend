export default function formatStars(num) {
    let myStars = [];
    for (var i = 0; i < num; i++) {
        myStars.push(<i className="fas fa-star"></i>)
    }
    let opp = 5-num;
    if (opp > 0) {
        for (var i = 0; i < opp; i++) {
            myStars.push(<i className="far fa-star"></i>)
        }
    }
    return myStars
}