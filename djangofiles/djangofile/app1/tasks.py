from celery import shared_task
from datetime import datetime
import os
import logging

logger = logging.getLogger(__name__)

@shared_task(name='app1.tasks.log_to_file')
def log_to_file():
    try:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_message = f'[{timestamp}] Scheduled task ran.\n'
        
        project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        log_file_path = os.path.join(project_dir, 'task_log.txt')

        with open(log_file_path, 'a') as f:
            f.write(log_message)
        
        logger.info(f'Successfully wrote to log file at {timestamp}')
        return f'Logged message at {timestamp}'
    except Exception as e:
        logger.error(f'Error in log_to_file task: {str(e)}')
        raise 