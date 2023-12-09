const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://coffee-store-front.web.app"],
    credentials: true,
  })
);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@assignment11.eiurimr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/// middleware----------------==-==-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==
// const verifyToken = (req, res, next) => {
//   const token = req.cookies?.token;
//   // console.log("token middle", token);
//   // if no token ---
//   if (!token) {
//     return res.status(401).send({ message: "unauthorized access" });
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "unauthorized access" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // start collection here =======================================
    const assignmentCollection = client
      .db("studyOnlineDB")
      .collection("assignments");

    const submittedCollection = client
      .db("studyOnlineDB")
      .collection("submitted");
    const faqCollection = client.db("studyOnlineDB").collection("faqs");
    const featureCollection = client.db("studyOnlineDB").collection("features");
    //end  collection  ==============================================

    // ================================Verify area ===============================
    // auth verify ---------------
    app.post("/jwt", async (req, res) => {
      try {
        const user = req.body;
        console.log(user);
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .send({ success: true });
      } catch (error) {
        console.log(error);
      }
    });

    // logout
    app.post("/logout", async (req, res) => {
      try {
        const user = req.body;
        console.log("logout user", user);
        res.clearCookie("token", { maxAge: 0 }).send({ success: true });
      } catch (error) {
        console.log(error);
      }
    });

    // ============================my assignment apis==============================
    /// delete my assignment --------------------
    app.delete("/api/v1/delete-assignment", async (req, res) => {
      try {
        const id = req.query.id;
        const query = { _id: new ObjectId(id) };
        const result = await submittedCollection.deleteOne(query);
        res.send(result);
        console.log(query);
      } catch (error) {
        console.log(error);
      }
    });

    // get  my  assignment api  ------------------
    app.get("/api/v1/my-assignment", async (req, res) => {
      try {
        // if (req.user.email !== req.query.email) {
        //   return res.status(403).send({ message: "forbidden access" });
        // }
        // console.log(req.user.email);
        const email = req.query.email;
        const query = { email: email };
        const result = await submittedCollection.find(query).toArray();
        res.send(result);
        console.log(query);
      } catch (error) {
        console.log(error);
      }
    });

    // ============================submitted assignment apis==============================
    // update  submitted  assignment api  ------------------
    app.put("/api/v1/submit-assignment/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const markAndStatus = req.body;
        const options = { upsert: true };
        const updateMarkAndStatus = {
          $set: {
            feedback: markAndStatus.feedback,
            getMark: markAndStatus.getMark,
            examiner: markAndStatus.examiner,
            status: markAndStatus.status,
          },
        };

        const result = await submittedCollection.updateOne(
          filter,
          updateMarkAndStatus,
          options
        );
        res.send(result);
        console.log(query);
      } catch (error) {
        console.log(error);
      }
    });

    // get  submitted  assignment api  ------------------
    app.get("/api/v1/submit-assignment", async (req, res) => {
      try {
        const query = { status: req.query.status };
        const result = await submittedCollection.find(query).toArray();
        res.send(result);
        console.log(query);
      } catch (error) {
        console.log(error);
      }
    });

    // submit an assignment api  ------------------
    app.post("/api/v1/submit-assignment", async (req, res) => {
      try {
        const assignment = req.body;
        const result = await submittedCollection.insertOne(assignment);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    // ============================all assignment apis==============================
    // create an assignment api  ------------------
    app.post("/api/v1/all-assignment", async (req, res) => {
      try {
        const assignment = req.body;
        const result = await assignmentCollection.insertOne(assignment);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    // get  single assignment data for view and update page  ------------------
    app.get("/api/v1/single-assignment/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await assignmentCollection.findOne(query);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    // update  assignment api -------------------
    app.put("/api/v1/all-assignment/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const assignment = req.body;
        const options = { upsert: true };
        const updateAssignment = {
          $set: {
            title: assignment.title,
            photo: assignment.photo,
            description: assignment.description,
            marks: assignment.marks,
            level: assignment.level,
            dueDate: assignment.dueDate,
          },
        };
        const result = await assignmentCollection.updateOne(
          filter,
          updateAssignment,
          options
        );
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    // delete  assignment api -------------------
    app.delete("/api/v1/all-assignment/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await assignmentCollection.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    // get all assignment api -------------------
    app.get("/api/v1/all-assignment", async (req, res) => {
      try {
        const level = req.query.level;
        let query = {};
        if (level) {
          query = { level: level };
        }
        const cursor = assignmentCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    // get features here ---------------
    app.get("/api/v1/features", async (req, res) => {
      const cursor = featureCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // faq get here ----------------
    app.get("/api/v1/faq", async (req, res) => {
      const cursor = faqCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Study Online Server Is Running!");
});

app.listen(port, () => {
  console.log(`study online server running on port ${port}`);
});
