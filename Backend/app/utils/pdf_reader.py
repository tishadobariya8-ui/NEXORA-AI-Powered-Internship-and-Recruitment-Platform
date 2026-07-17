import fitz

def extract_text_from_pdf(file):

    try:
        pdf = fitz.open(
            stream=file.read(),
            filetype="pdf"
        )

        text = ""

        for page in pdf:

            page_text = page.get_text()

            # Skip empty pages
            if page_text.strip():
                text += page_text

        pdf.close()

        return text

    except Exception as e:
        raise Exception(
            f"Invalid or corrupted PDF file: {str(e)}"
        )