require("dotenv").config(); // Always at the top

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Note=require("./models/note.model")// ya jo bhi path ho
const User = require("./models/user.model");
const { authenticateToken } = require("./utilities");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);

// MongoDB Connection
mongoose
  .connect(config.connectionString)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
//backend  Ready ho gya hai 

// Create Account Route
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({ error: true, message: "User already exists" });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});


// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});
//Get User

app.get("/get-user", authenticateToken, async (req, res) => {
  // Yaha req.user me hi user ka data hai
  const isUser = await User.findOne({ _id: req.user._id });

  if (!isUser) {
    return res.sendStatus(401); // Unauthorized if user not found
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});



//add-note //yah se ye route glt tha 

// app.post("/add-note", authenticateToken, async (req, res) => {
//   console.log("REQ BODY:", req.body);

//   const { title, content, tags } = req.body;

//   const user = req.user.user; // Assuming you set it like that in middleware

//   if (!title) {
//     return res.status(400).json({ error: true, message: "Title is required" });
//   }

//   if (!content) {
//     return res.status(400).json({ error: true, message: "Content is required" });
//   }

//   try {
//     const note = new Note({
//       title,
//       content,
//       tags: tags || [],
//       userId: user._id,
//     });

//     await note.save();

//     return res.json({
//       error: false,
//       note,
//       message: "Note added successfully",
//     });
//   } catch (error) {
//     console.error("Save Note Error:", error);
//     return res.status(500).json({
//       error: true,
//       message: "Internal server error",
//     });
//   }
// }); //ye galt tha ese thik kara hai
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;  // fix here

  if (!title) return res.status(400).json({ error: true, message: "Title is required" });
  if (!content) return res.status(400).json({ error: true, message: "Content is required" });

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    res.json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    console.error("Save Note Error:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

//edit-note

// app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
//   const noteId = req.params.noteId;
//   const { title, content, tags, isPinned } = req.body;
//   const userId = req.user_id; // Correct way to access userId

//   // Agar kuch bhi update karne ko nahi diya
//   if (!title && !content && !tags && typeof isPinned !== 'boolean') {
//     return res.status(400).json({
//       error: true,
//       message: "No changes provided"
//     });
//   }

//   try {
//     // Find the note by ID and userId
//     const note = await Note.findOne({ _id: noteId, userId });

//     if (!note) {
//       return res.status(404).json({
//         error: true,
//         message: "Note not found"
//       });
//     }

//     // Update fields if they are provided
//     if (title) note.title = title;
//     if (content) note.content = content;
//     if (tags) note.tags = tags;
//     if (typeof isPinned === 'boolean') note.isPinned = isPinned;

//     // Save the updated note
//     await note.save();

//     return res.json({
//       error: false,
//       note,
//       message: "Note updated successfully"
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal server error"
//     });
//   }
// });


app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const userId = req.user._id || req.user.user._id; // token me kaise save ho us hisab se

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ error: true, message: "Invalid note ID" });
  }

  try {
    // Sirf apni hi note update ho
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: { ...(title && { title }), ...(content && { content }), ...(tags && { tags }), ...(typeof isPinned === "boolean" && { isPinned }) } },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    res.json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    console.error("Edit Note Error:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});


//get all notes
// app.get("/get-all-notes", authenticateToken, async (req, res) => {
//   const { user } = req.user;
//   try {
//     const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
//     return res.json({
//       error: false,
//       notes,
//       message: "All Notes retrieved successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal server Error",
//     });
//   }
// });
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const user = req.user;  // direct user object

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "All Notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server Error",
    });
  }
});

//Delete-notes
// app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
//   const noteId = req.params.noteId;             // URL se noteId nikaala (like /delete-note/123)
//   const { user } = req.user;                    // authenticateToken middleware se user info mil gaya

//   try {
//     const note = await Note.findOne({
//       _id: noteId,
//       userId: user._id,                         // Apne hi user ki note ho check kiya
//     });

//     if (!note) {
//       return res.status(404).json({
//         error: true,
//         message: "Note not found",              // Note nahi mila ya dusre user ka hai
//       });
//     }

//     await Note.deleteOne({
//       _id: noteId,
//       userId: user._id,                         // Sirf apni note delete ho
//     });

//     return res.json({
//       error: false,
//       message: "Note deleted successfully",     // Success message
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal server Error",         // Server issue
//     });
//   }
// }); //glt hai
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user._id || req.user.user?._id; // ✅ safe access

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ error: true, message: "Invalid note ID" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId });

    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete Note Error:", error);
    return res.status(500).json({ error: true, message: "Internal server Error" });
  }
});


//Update isPinned value
// app.put("/update-note-pinnned/:noteId",authenticateToken, async (req,res)=>{
  
//   const noteId = req.params.noteId;
//   const { isPinned } = req.body;
//   const userId = req.user.user._id; // Correct way to access userId

//   // Agar kuch bhi update karne ko nahi diya
  
//   try {
//     // Find the note by ID and userId
//     const note = await Note.findOne({ _id: noteId, userId });

//     if (!note) {
//       return res.status(404).json({
//         error: true,
//         message: "Note not found"
//       });
//     }

//     // Update fields if they are provided
    
//     if (isPinned) note.isPinned = isPinned || false;

//     // Save the updated note
//     await note.save();

//     return res.json({
//       error: false,
//       note,
//       message: "Note updated successfully"
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal server error"
//     });
//   }   
// })
// Update Note's isPinned status
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;
  const userId = req.user._id; // ✅ FIXED: Direct user object

  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ error: true, message: "Invalid note ID" });
    }

    // Find note for this user
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // Update only if value is provided
    if (typeof isPinned !== "undefined") {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note pin status updated successfully"
    });

  } catch (error) {
    console.error("Error updating pinned status:", error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});
// search api
app.get("/search-notes", authenticateToken, async (req, res) => {
  const user = req.user; // ✅ user object le rahe hai
  const { query } = req.query; // ✅ URL se query param le rahe hai

  if (!query) {
    return res.status(400).json({
      error: true,
      message: "Search query is required",
    });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },   // ✅ 'i' lowercase
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});


// Start Server
app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});

module.exports = app;
