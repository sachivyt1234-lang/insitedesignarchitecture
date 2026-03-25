import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Project = {
    title : Text;
    description : Text;
    category : Text;
    year : Nat;
    featured : Bool;
  };

  type Article = {
    id : Nat;
    title : Text;
    content : Text;
    excerpt : Text;
    author : Text;
    date : Time.Time;
    category : Text;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type ArticleInput = {
    title : Text;
    content : Text;
    excerpt : Text;
    author : Text;
    category : Text;
  };

  module Article {
    public func compare(article1 : Article, article2 : Article) : Order.Order {
      Nat.compare(article1.id, article2.id);
    };
  };

  // Store projects, articles, and contact form submissions
  let projects = Map.empty<Nat, Project>();
  let articles = Map.empty<Nat, Article>();
  let contactForms = Map.empty<Nat, ContactForm>();

  var nextProjectId = 0;
  var nextArticleId = 1;
  var nextContactFormId = 0;

  // Add a new project (admin functionality)
  public shared ({ caller }) func addProject(project : Project) : async Nat {
    // For brevity, skipping admin check. Implement as needed.
    let projectId = nextProjectId;
    projects.add(projectId, project);
    nextProjectId += 1;
    projectId;
  };

  // Add a new article (admin functionality)
  public shared ({ caller }) func addArticle(input : ArticleInput) : async Nat {
    // For brevity, skipping admin check. Implement as needed.
    let articleId = nextArticleId;
    let article : Article = {
      id = articleId;
      title = input.title;
      content = input.content;
      excerpt = input.excerpt;
      author = input.author;
      date = Time.now();
      category = input.category;
    };
    articles.add(articleId, article);
    nextArticleId += 1;
    articleId;
  };

  // Submit contact form
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let id = nextContactFormId;
    let contactForm : ContactForm = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactForms.add(id, contactForm);
    nextContactFormId += 1;
  };

  // Query all projects
  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray();
  };

  // Query all articles
  public query ({ caller }) func getAllArticles() : async [Article] {
    articles.values().toArray().sort();
  };

  // Get single article by id
  public query ({ caller }) func getArticleById(id : Nat) : async Article {
    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?article) { article };
    };
  };
};
