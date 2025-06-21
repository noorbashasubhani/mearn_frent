const Team = require("../models/Team");

exports.addTeam = async (req, res) => {
  const { team_name, travel_type, dept_name, dept_head, dept_lead, team_employees,for_the_month } = req.body;
  const user_id = req.params.user_id;

  try {
    const NewData = new Team({
      team_name,
      travel_type,
      dept_name,
      dept_head,
      dept_lead,
      team_employees,
      added_by: user_id,
      for_the_month,
      status:'Y'
    });

    await NewData.save();

    res.status(200).json({ message: "Team added successfully", data: NewData });
  } catch (error) {
    console.error("Error adding team:", error);
    res.status(500).json({ message: "Something went wrong, please try again." });
  }
};


exports.getTeams = async(req,res)=>{
    //const user_id = req.user.userId;
      try{
        const list = await Team.find({status:'Y'}).populate("dept_head","first_name").populate("dept_lead","first_name").populate("added_by","first_name").populate("team_employees","first_name");
        res.status(200).json({message:"success",data:list});
      }catch(error){
        res.status(500).json({ message: "Something went wrong, please try again." });
      }
  }

  exports.DelTeam = async (req, res) => {
  const { row_id } = req.params;

  try {
    const del = await Team.findByIdAndUpdate(
      row_id,
      { status: 'N' },
      { new: true } // This returns the updated document
    );
    res.status(200).json({ message: "Success", data: del });
  } catch (error) {
    console.error("Delete Team Error:", error);
    res.status(500).json({ message: "Something went wrong, please try again." });
  }
};
