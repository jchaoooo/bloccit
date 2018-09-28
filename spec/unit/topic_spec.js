const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({ force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system"
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "Top movies of the year",
        description: "1. Crazy Rich Asians"
      })
      .then((topic) => {
        expect(topic.title).toBe("Top movies of the year");
        expect(topic.description).toBe("1. Crazy Rich Asians");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic object with missing title or description", (done) => {
      Topic.create({
        title: "Top movies of the year"
      })
      .then((post) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });
  });

  describe("#getTopic()", () => {
    it("it should return an array of post objects that are associated with the topic", () => {
      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
        expect(associatedPosts[0].body).toBe("I saw some rocks.");
        expect(associatedPosts[0].topicId).toBe(this.topic.id);
        done();
      });
    });
  });

});
