const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({ force: true }).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
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

          Flair.create({
            name: "Red Flair",
            color: "red",
            topicId: this.topic.id,
            postId: this.post.id
          })
          .then((flair) => {
            this.flair = flair;
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
      it("should create a flair object with a name, color, assigned topic, and assigned post", (done) => {
        Flair.create({
          name: "Green Flair",
          color: "green",
          topicId: this.topic.id,
          postId: this.post.id
        })
        .then((flair) => {
          expect(flair.name).toBe("Green Flair");
          expect(flair.color).toBe("green");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should not create a flair with missing name, color, assigned topic or assigned post", (done) => {
        Flair.create({
          name: "Green Flair"
        })
        .then((flair) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Flair.name cannot be null");
          expect(err.message).toContain("Flair.color cannot be null");
          done();
        })
      });
    });

    describe("#setFlair()", () => {
      it("should associate a post and a flair together", (done) => {
        Post.create({
          title: "Post for flair topic",
          body: "This is for a flair post",
          topicId: this.topic.id
        })
        .then((newPost) => {
          expect(this.flair.postId).toBe(this.post.id);
          this.flair.setPost(newPost)
          .then((flair) => {
            expect(flair.postId).toBe(newPost.id);
            done();
          });
        })
      });
    });

    describe("#getPost()", () => {
      it("should return the associated post", (done) => {
        this.flair.getPost()
        .then((associatedPost) => {
          expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
          done();
        });
      });
    });

  });
});
