"""
Eleven Labs Text-to-Speech API Integration
Provides voice synthesis for PropGuard AI's Alex persona
"""

from flask import Blueprint, request, jsonify, send_file
import os
import requests
import json
import io
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

elevenlabs_bp = Blueprint('elevenlabs', __name__)

# Eleven Labs API Configuration
ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY', '')
ELEVENLABS_VOICE_ID = os.getenv('ELEVENLABS_VOICE_ID', 'alex-professional-australian')
ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1'

class ElevenLabsService:
    def __init__(self):
        self.api_key = ELEVENLABS_API_KEY
        self.voice_id = ELEVENLABS_VOICE_ID
        self.base_url = ELEVENLABS_BASE_URL
    
    def is_configured(self):
        """Check if Eleven Labs API is properly configured"""
        return bool(self.api_key and self.api_key != '')
    
    def generate_speech(self, text, voice_id=None, model_id='eleven_multilingual_v2'):
        """Generate speech from text"""
        if not self.is_configured():
            return {
                'success': False,
                'error': 'Eleven Labs API not configured. Please set ELEVENLABS_API_KEY environment variable.'
            }
        
        try:
            voice_id = voice_id or self.voice_id
            
            headers = {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': self.api_key
            }
            
            payload = {
                'text': text,
                'model_id': model_id,
                'voice_settings': {
                    'stability': 0.8,
                    'similarity_boost': 0.9,
                    'style': 0.2,
                    'use_speaker_boost': True
                }
            }
            
            logger.info(f'Generating Eleven Labs speech for text: {text[:50]}...')
            
            response = requests.post(
                f'{self.base_url}/text-to-speech/{voice_id}',
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                logger.info('Eleven Labs speech generation successful')
                return {
                    'success': True,
                    'audio_data': response.content,
                    'content_type': 'audio/mpeg',
                    'voice_id': voice_id,
                    'message': 'Speech generated successfully'
                }
            else:
                error_msg = f'Eleven Labs API error: {response.status_code} - {response.text}'
                logger.error(error_msg)
                return {
                    'success': False,
                    'error': error_msg
                }
                
        except requests.RequestException as e:
            error_msg = f'Eleven Labs API request failed: {str(e)}'
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
    
    def get_available_voices(self):
        """Get list of available voices"""
        if not self.is_configured():
            return []
        
        try:
            headers = {
                'xi-api-key': self.api_key
            }
            
            response = requests.get(
                f'{self.base_url}/voices',
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('voices', [])
            else:
                logger.error(f'Failed to fetch voices: {response.status_code}')
                return []
                
        except Exception as e:
            logger.error(f'Voice list error: {str(e)}')
            return []
    
    def generate_alex_speech(self, text):
        """Generate speech optimized for Alex persona"""
        return self.generate_speech(text, self.voice_id, 'eleven_multilingual_v2')

# Initialize Eleven Labs service
elevenlabs_service = ElevenLabsService()

@elevenlabs_bp.route('/health', methods=['GET'])
def elevenlabs_health():
    """Check Eleven Labs API integration health"""
    try:
        config_status = elevenlabs_service.is_configured()
        
        return jsonify({
            'success': True,
            'service': 'Eleven Labs Text-to-Speech',
            'status': 'operational' if config_status else 'not_configured',
            'configured': config_status,
            'voice_id': ELEVENLABS_VOICE_ID if config_status else None,
            'api_key_configured': bool(ELEVENLABS_API_KEY and ELEVENLABS_API_KEY != ''),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'service': 'Eleven Labs Text-to-Speech',
            'status': 'error',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

@elevenlabs_bp.route('/generate', methods=['POST'])
def generate_speech():
    """Generate speech from text"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'Request body is required'
            }), 400
        
        text = data.get('text', '')
        voice_id = data.get('voice_id')
        model_id = data.get('model_id', 'eleven_multilingual_v2')
        
        if not text:
            return jsonify({
                'success': False,
                'error': 'Text is required for speech generation'
            }), 400
        
        # Generate speech
        result = elevenlabs_service.generate_speech(text, voice_id, model_id)
        
        if result['success']:
            # Return audio data as base64 for frontend
            import base64
            audio_base64 = base64.b64encode(result['audio_data']).decode('utf-8')
            
            return jsonify({
                'success': True,
                'message': 'Speech generated successfully',
                'audio_data': audio_base64,
                'content_type': result['content_type'],
                'voice_id': result['voice_id'],
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({
                'success': False,
                'error': result.get('error'),
                'timestamp': datetime.now().isoformat()
            }), 500
            
    except Exception as e:
        logger.error(f'Speech generation error: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Speech generation failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@elevenlabs_bp.route('/alex', methods=['POST'])
def generate_alex_speech():
    """Generate speech using Alex persona"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'Request body is required'
            }), 400
        
        text = data.get('text', '')
        
        if not text:
            return jsonify({
                'success': False,
                'error': 'Text is required for speech generation'
            }), 400
        
        # Generate Alex speech
        result = elevenlabs_service.generate_alex_speech(text)
        
        if result['success']:
            import base64
            audio_base64 = base64.b64encode(result['audio_data']).decode('utf-8')
            
            return jsonify({
                'success': True,
                'message': 'Alex speech generated successfully',
                'audio_data': audio_base64,
                'content_type': result['content_type'],
                'voice_id': result['voice_id'],
                'persona': 'alex',
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({
                'success': False,
                'error': result.get('error'),
                'timestamp': datetime.now().isoformat()
            }), 500
            
    except Exception as e:
        logger.error(f'Alex speech generation error: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Alex speech generation failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@elevenlabs_bp.route('/voices', methods=['GET'])
def get_available_voices():
    """Get list of available voices"""
    try:
        voices = elevenlabs_service.get_available_voices()
        
        return jsonify({
            'success': True,
            'voices': voices,
            'count': len(voices),
            'default_voice_id': ELEVENLABS_VOICE_ID,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f'Voice list error: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Failed to fetch voices: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@elevenlabs_bp.route('/config', methods=['GET'])
def get_configuration():
    """Get Eleven Labs configuration status"""
    try:
        config_status = elevenlabs_service.is_configured()
        
        return jsonify({
            'success': True,
            'configured': config_status,
            'voice_id': ELEVENLABS_VOICE_ID,
            'api_key_configured': bool(ELEVENLABS_API_KEY and ELEVENLABS_API_KEY != ''),
            'base_url': ELEVENLABS_BASE_URL,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Configuration check failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500
