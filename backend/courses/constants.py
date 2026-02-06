from django.db import models

class QuestionBlockType(models.TextChoices):
    TEXT = "text"
    IMAGE = "image"
    FILE = "file"
    
class AnswerType(models.TextChoices):
    TRUE_FALSE = "true_false", "True/False"
    FILL_BLANK = "fill_blank", "Fill in the Blank"
    MULTIPLE_CHOICE = "multiple_choice", "Multiple Choice"
    ESSAY = "essay", "Essay"
    FILE_UPLOAD = "file_upload", "File Upload"
    
class QuizStatus(models.TextChoices):
    NOT_STARTED = "not_started", "Not Started"
    IN_PROGRESS = "in_progress", "In Progress"
    SUBMITTED = "submitted", "Submitted"
    IN_REVIEW = "in_review", "In Review"
    COMPLETED = "completed", "Completed"
    
class CourseStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    REVIEW = "review", "In Review"
    PUBLISHED = "published", "Published"
    ARCHIVED = "archived", "Archived"
    
class ContentType(models.TextChoices):
    VIDEO = "video", "Video"
    QUIZ = "quiz", "Quiz"
    ATTACHMENT = "attachment", "Attachment"
    ASSIGNMENT = "assignment", "Assignment"
    ARTICLE = "article", "Article"
    
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