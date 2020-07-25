// const mongoose = require("mongoose"),
// 	  Campground = require("./models/campground"),
// 	  Comment = require("./models/comment");

// var data = [
// 	{
// 		name: "Clouds Rest",
//         image: "https://cdn.hiconsumption.com/wp-content/uploads/2019/07/Best-Affordable-Camping-Gear-000-Hero.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         author:{
//             id : "5f1c4e8a977f461ff83f6824",
//             username: "wharter"
//         }
//     },
//     {
//         name: "Clouds Play",
//         image: "https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_md.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         author:{
//             id : "5f1c4e8a977f461ff83f6824",
//             username: "wharter"
//         }
//     },
//     {
//         name: "Clouds Fall",
//         image: "https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_md.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         author:{
//             id : "5f1c4e8a977f461ff83f6824",
//             username: "wharter"
//         }
//     }
// ]

// function seedDB(){
// 	Comment.remove({}, err => {
// 		err ? console.log(err) : console.log("Comment removed!");
	
// 		Campground.remove({}, err => {
// 			 err ? console.log(err) : console.log("Camp removed!");
// 			data.forEach(seed => {
// 				Campground.create(seed, (err, campground) =>{
// 					err ? console.log(err) : console.log("created camp");
					
// 					Comment.create(
//                         {
//                             author: {
//                                 id : "5f1c4e8a977f461ff83f6824",
//                                 username: "wharter"
//                             }
//                         }, 
//                         (err, campComment)=>{
// 						if(err)
// 							console.log(err);

// 						campground.comment.push(campComment);
// 						campground.save();
// 						console.log("comment created");
// 					});
// 				});
// 			});
// 		});
// 	});
// }

// module.exports = seedDB;