import logging
import os
from flask import render_template, request, flash, redirect, url_for, session
from app import app
from groq_service import groq_service

logger = logging.getLogger(__name__)

@app.route('/')
def index():
    """Main page with decision input form"""
    return render_template('index.html',
                         firebase_api_key=os.environ.get("FIREBASE_API_KEY"),
                         firebase_project_id=os.environ.get("FIREBASE_PROJECT_ID"),
                         firebase_app_id=os.environ.get("FIREBASE_APP_ID"))

@app.route('/analyze', methods=['POST'])
def analyze_decision():
    """Process the decision analysis request"""
    try:
        user_decision = request.form.get('decision', '').strip()
        
        if not user_decision:
            flash('Please enter a decision you need help with.', 'error')
            return redirect(url_for('index'))
        
        if len(user_decision) < 10:
            flash('Please provide more details about your decision (at least 10 characters).', 'error')
            return redirect(url_for('index'))
        
        # Generate analysis using Groq service
        logger.info(f"Analyzing decision: {user_decision[:50]}...")
        analysis = groq_service.generate_decision_analysis(user_decision)
        
        return render_template('result.html', 
                             decision=user_decision, 
                             analysis=analysis)
        
    except Exception as e:
        logger.error(f"Error in analyze_decision: {str(e)}")
        flash(f'Sorry, there was an error processing your request: {str(e)}', 'error')
        return redirect(url_for('index'))

@app.route('/about')
def about():
    """About page explaining the humanitarian impact"""
    return render_template('about.html',
                         firebase_api_key=os.environ.get("FIREBASE_API_KEY"),
                         firebase_project_id=os.environ.get("FIREBASE_PROJECT_ID"),
                         firebase_app_id=os.environ.get("FIREBASE_APP_ID"))

@app.route('/dashboard')
def dashboard():
    """User dashboard showing decision history"""
    return render_template('dashboard.html',
                         firebase_api_key=os.environ.get("FIREBASE_API_KEY"),
                         firebase_project_id=os.environ.get("FIREBASE_PROJECT_ID"),
                         firebase_app_id=os.environ.get("FIREBASE_APP_ID"))

@app.route('/new')
def new_decision():
    """Start a new decision analysis"""
    return redirect(url_for('index'))

@app.errorhandler(404)
def not_found_error(error):
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {str(error)}")
    flash('An internal error occurred. Please try again.', 'error')
    return render_template('index.html'), 500
