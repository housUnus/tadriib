from django.db import models

class AnswerType(models.TextChoices):
    TRUE_FALSE = "true_false", "True/False"
    FILL_BLANK = "fill_blank", "Fill in the Blank"
    MULTIPLE_CHOICE = "multiple_choice", "Multiple Choice"
    ESSAY = "essay", "Essay"
    FILE_UPLOAD = "file_upload", "File Upload"
    
class CourseStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    REVIEW = "review", "In Review"
    PUBLISHED = "published", "Published"
    ARCHIVED = "archived", "Archived"
    REJECTED = "rejected", "Rejected"
    
class ContentType(models.TextChoices):
    VIDEO = "video", "Video"
    QUIZ = "quiz", "Quiz"
    ATTACHMENT = "attachment", "Attachment"
    ASSIGNMENT = "assignment", "Assignment"
    ARTICLE = "article", "Article"
    CONFERENCE = "conference", "Conference"
    
class CourseLevel(models.TextChoices):
    BEGINNER = "beginner", "Beginner"
    INTERMEDIATE = "intermediate", "Intermediate"
    ADVANCED = "advanced", "Advanced"
    ALL_LEVELS = "all_levels", "All Levels"
    
class CourseLanguageTypes(models.TextChoices):
    ENGLISH = "en", "English"
    ARABIC = "ar", "Arabic"
    FRENCH = "fr", "French"
    SPANISH = "es", "Spanish"
    
class AccessTypes(models.TextChoices):
    LIFETIME = "lifetime", "Lifetime"
    LIMITED = "limited", "Limited"
    

class ConferenceStatus(models.TextChoices):
    SCHEDULED = "scheduled", "Scheduled"
    LIVE = "live", "Live"
    ENDED = "ended", "Ended"
    
class CourseType(models.TextChoices):
    COURSE = "course", "Course"
    QUIZ = "quiz", "Quiz"
    WEBINAR = "webinar", "Webinar"