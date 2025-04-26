const Team = require("../models/Team");

exports.addTeam=async(req,res)=>{
const {team_name,travel_type,dept_name,dept_head,dept_lead,team_employees}=req.body;
const user_id = req.user.userId;
    try{
        const NewData=new Team({
            team_name,
            travel_type,
            dept_name,
            dept_head,
            dept_lead,
            team_employees,
            added_by:user_id
        });
        await NewData.save();
        res.status(200).json({ message: "successfully." });

    }catch(error){
        console.error("Error adding domestic credit note:", error);
        res.status(500).json({ message: "Something went wrong, please try again." });
    }
}

exports.getTeams = async(req,res)=>{
    //const user_id = req.user.userId;
      try{
        const list = await Team.find().populate("dept_head","first_name").populate("dept_lead","first_name").populate("added_by","first_name").populate("team_employees","first_name");
        res.status(200).json({message:"success",data:list});
      }catch(error){
        res.status(500).json({ message: "Something went wrong, please try again." });
      }
  }

  exports.DelTeam=async(req,res)=>{
    const {row_id}=req.params
     try{
      const del =await Team.findByIdAndDelete(row_id);
      res.status(200).json({message:"success"});
     }catch(error){
        res.status(500).json({ message: "Something went wrong, please try again." });
     }
  }