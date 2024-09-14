import click
import requests
from bs4 import BeautifulSoup
import os
import hashlib

# Define CLI
@click.command()
@click.option('-o', '--output', default='.', help='Specify the output folder for the subtitles.')
@click.argument('file', type=click.Path(exists=True))
def main(output, file):
    imdb_id = find_imdb_id(file)
    file_hash = get_file_hash(file)
    file_size = get_file_size(file)
    
    subtitles = scrape_subtitles(imdb_id, file_hash, file_size)
    
    if subtitles:
        prompt_user_and_download(subtitles, output)
    else:
        print("No subtitles found.")

def find_imdb_id(filename):
    # Implement logic to extract IMDb ID from filename or metadata
    # This is a placeholder; replace with actual logic
    return "tt1234567"

def get_file_size(filename):
    return os.path.getsize(filename)

def get_file_hash(filename):
    hash_md5 = hashlib.md5()
    with open(filename, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def scrape_subtitles(imdb_id, file_hash=None, file_size=None):
    search_url = f'https://www.opensubtitles.org/en/search/sublanguageid-eng'
    if imdb_id:
        search_url += f'&imdbid={imdb_id}'
    if file_hash:
        search_url += f'&hash={file_hash}'
    if file_size:
        search_url += f'&size={file_size}'

    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    results = []
    for item in soup.find_all('div', class_='search_results'):
        name = item.find('a', class_='subtitles__link').text.strip()
        url = item.find('a', class_='subtitles__link')['href']
        results.append({'name': name, 'url': url})
    
    return results

def download_subtitle(subtitle_url, output_folder):
    response = requests.get(subtitle_url)
    subtitle_name = subtitle_url.split('/')[-1]
    with open(os.path.join(output_folder, subtitle_name), 'wb') as file:
        file.write(response.content)

def prompt_user_and_download(subtitles, output_folder):
    print("Available subtitles:")
    for i, subtitle in enumerate(subtitles):
        print(f"{i + 1}: {subtitle['name']}")
    
    choice = int(input("Choose subtitle number: ")) - 1
    if 0 <= choice < len(subtitles):
        download_subtitle(subtitles[choice]['url'], output_folder)
        print(f"Downloaded: {subtitles[choice]['name']}")
    else:
        print("Invalid choice.")

if __name__ == '__main__':
    main()
