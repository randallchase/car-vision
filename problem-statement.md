# Problem Statement

**The integration of computer vision technology and digital billboards provide opportunity to target ads to consumers more effectively.**

- Digital billboards are becoming ubiquitous.
- Cars (make, model, year) provide valuable demographic information to advertisers.
- Using this information, advertisers can target ads according to the predicted demographic of the drivers of cars passing a billboard.

##Use Case

##Data Sources

##Software Architecture
- Client Application
    - Input: Ideally tie to live video which would be far enough ahead of billboard to all time for change, but for proof of concept, use a clip of video
    - Output: Ad chosen by proportion of cars
- Third-party Web Service (possible)
    - AWS Rekognition
    - Clarifai
    - Sighthound
- HTTP Server
    - Analytics
    - Ads shown
    - Blockchain ledger
- Data Store
    - Car History
