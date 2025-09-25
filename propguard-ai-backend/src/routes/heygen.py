"""
HeyGen Interactive Avatar API Integration
Provides video avatar generation for Sensay real estate platform
"""

from flask import Blueprint, request, jsonify
import os
import requests
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

heygen_bp = Blueprint('heygen', __name__)

# HeyGen API Configuration
HEYGEN_API_KEY = os.getenv('HEYGEN_API_KEY', '')
HEYGEN_AVATAR_ID = os.getenv('HEYGEN_AVATAR_ID', 'Marianne_CasualLook_public')
HEYGEN_BASE_URL = 'https://api.heygen.com/v1'

class HeyGenService:
    def __init__(self):
        self.api_key = HEYGEN_API_KEY
        self.avatar_id = HEYGEN_AVATAR_ID
        self.base_url = HEYGEN_BASE_URL
    
    def is_configured(self):
        """Check if HeyGen API is properly configured"""
        return bool(self.api_key and self.avatar_id and self.api_key != '')
    
    def generate_avatar_video(self, text, voice='en_us_female_001'):
        """Generate interactive avatar video"""
        if not self.is_configured():
            return {
                'success': False,
                'error': 'HeyGen API not configured. Please set HEYGEN_API_KEY and HEYGEN_AVATAR_ID environment variables.'
            }
        
        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                'text': text,
                'voice': voice,
                'avatar_id': self.avatar_id,
                'quality': 'high',
                'ratio': '16:9'
            }
            
            logger.info(f'Generating HeyGen video for text: {text[:50]}...')
            
            response = requests.post(
                f'{self.base_url}/video/generate',
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                data = response.json()
                logger.info('HeyGen video generation successful')
                return {
                    'success': True,
                    'video_url': data.get('video_url'),
                    'task_id': data.get('task_id'),
                    'message': 'Video generated successfully'
                }
            else:
                error_msg = f'HeyGen API error: {response.status_code} - {response.text}'
                logger.error(error_msg)
                return {
                    'success': False,
                    'error': error_msg
                }
                
        except requests.RequestException as e:
            error_msg = f'HeyGen API request failed: {str(e)}'
            logger.error(error_msg)
            return {
                'success': False,
                'error': error_msg
            }
        except Exception as e:
            error_msg = f'Unexpected error: {str(e)}'
            logger.error(error_msg)
            return {
                'success': False,
                'error': error_msg
            }
    
    def get_task_status(self, task_id):
        """Get status of a video generation task"""
        if not self.is_configured():
            return {
                'success': False,
                'error': 'HeyGen API not configured'
            }
        
        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}'
            }
            
            response = requests.get(
                f'{self.base_url}/video/status/{task_id}',
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'success': True,
                    'status': data.get('status'),
                    'video_url': data.get('video_url'),
                    'progress': data.get('progress', 0)
                }
            else:
                return {
                    'success': False,
                    'error': f'Status check failed: {response.status_code} - {response.text}'
                }
                
        except Exception as e:
            return {
                'success': False,
                'error': f'Status check error: {str(e)}'
            }
    
    def get_available_avatars(self):
        """Get list of available avatars"""
        if not self.is_configured():
            return []
        
        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}'
            }
            
            response = requests.get(
                f'{self.base_url}/avatar.list',
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('avatars', [])
            else:
                logger.error(f'Failed to fetch avatars: {response.status_code}')
                return []
                
        except Exception as e:
            logger.error(f'Avatar list error: {str(e)}')
            return []

# Initialize HeyGen service
heygen_service = HeyGenService()

@heygen_bp.route('/health', methods=['GET'])
def heygen_health():
    """Check HeyGen API integration health"""
    try:
        config_status = heygen_service.is_configured()
        
        return jsonify({
            'success': True,
            'service': 'HeyGen Interactive Avatar',
            'status': 'operational' if config_status else 'not_configured',
            'configured': config_status,
            'avatar_id': HEYGEN_AVATAR_ID if config_status else None,
            'api_key_configured': bool(HEYGEN_API_KEY and HEYGEN_API_KEY != ''),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'service': 'HeyGen Interactive Avatar',
            'status': 'error',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

@heygen_bp.route('/generate', methods=['POST'])
def generate_avatar_video():
    """Generate interactive avatar video"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'Request body is required'
            }), 400
        
        text = data.get('text', '')
        voice = data.get('voice', 'en_us_female_001')
        
        if not text:
            return jsonify({
                'success': False,
                'error': 'Text is required for video generation'
            }), 400
        
        # Generate video
        result = heygen_service.generate_avatar_video(text, voice)
        
        if result['success']:
            return jsonify({
                'success': True,
                'message': 'Video generated successfully',
                'video_url': result.get('video_url'),
                'task_id': result.get('task_id'),
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({
                'success': False,
                'error': result.get('error'),
                'timestamp': datetime.now().isoformat()
            }), 500
            
    except Exception as e:
        logger.error(f'Avatar generation error: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Avatar generation failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@heygen_bp.route('/status/<task_id>', methods=['GET'])
def get_video_status(task_id):
    """Get status of video generation task"""
    try:
        result = heygen_service.get_task_status(task_id)
        
        if result['success']:
            return jsonify({
                'success': True,
                'task_id': task_id,
                'status': result.get('status'),
                'video_url': result.get('video_url'),
                'progress': result.get('progress'),
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({
                'success': False,
                'error': result.get('error'),
                'timestamp': datetime.now().isoformat()
            }), 500
            
    except Exception as e:
        logger.error(f'Status check error: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Status check failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@heygen_bp.route('/avatars', methods=['GET'])
def get_available_avatars():
    """Get list of available avatars"""
    try:
        avatars = heygen_service.get_available_avatars()
        
        return jsonify({
            'success': True,
            'avatars': avatars,
            'count': len(avatars),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f'Avatar list error: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Failed to fetch avatars: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@heygen_bp.route('/config', methods=['GET'])
def get_configuration():
    """Get HeyGen configuration status"""
    try:
        config_status = heygen_service.is_configured()
        
        return jsonify({
            'success': True,
            'configured': config_status,
            'avatar_id': HEYGEN_AVATAR_ID,
            'api_key_configured': bool(HEYGEN_API_KEY and HEYGEN_API_KEY != ''),
            'base_url': HEYGEN_BASE_URL,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Configuration check failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500
