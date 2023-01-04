
function linux_dep1(){
var sudo = require('sudo-prompt');
    var options = {
      name: 'Electron',
      //cns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
    };
    sudo.exec('apt-get install -y zenity curl parallel python3-pip git ', options,
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('stdout: ' + stdout);
      }
    );
}
function linux_dep2()
{
    sudo.exec('apt-get install -y  ibcurl4-openssl-dev libmagick++-dev libmariadbclient-dev libssl-dev', options,
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('stdout: ' + stdout);
      }
    );

}

function mkcfiles(){
// Execute bash script
exec("mkdir -p $HOME/C_files/application", createscript);
 
// Callback
function createscript(error, stdout, stderr) {
   console.log(error, stdout)
}
}

function wgetcurl(){
var wget = require('node-wget');

    var url ="https://github.com/curl/curl/releases/download/curl-7_55_0/curl-7.55.0.tar.gz"
    var destination_folder_or_filename=userdir+"/C_files/application/curl-7.55.0.tar.gz"
    wget({
      url: url,
      dest: destination_folder_or_filename,      // destination path or path with filenname, default is ./
      timeout: 2000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
  },
  function (error, response, body) {
      if (error) {
          console.log('--- error:');
          console.log(error);            // error encountered
      } else {
          console.log('--- headers:');
          console.log(response.headers); // response headers
          console.log('--- body:');
          console.log(body);             // content of package
      }
  }
);
}

function tar(){

sudo.exec('tar -xvf $HOME/C_files/application/curl-7.55.0.tar.gz -C  $HOME/C_files/application/', options,
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('Tar extracted succcesfully ' );
      }
    );
}

function tarconfig()
{
    sudo.exec('$HOME/C_files/application/curl-7.55.0/configure && make && make install', options,
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('Configure run succesfully' );
      }
    );
}

function minicondacurl()
{

exec("curl -O https://repo.anaconda.com/miniconda/Miniconda3-py39_4.11.0-Linux-x86_64.sh ", curlminiconda);
 
// Callback
function curlminiconda(error, stdout, stderr) {
   console.log("curl done")
}

}

function cpakgs()
{
    sudo.exec('bash Miniconda3-py39_4.11.0-Linux-x86_64.sh -b && mkdir -p $HOME/miniconda3/c_pkgs && conda config --add pkgs_dirs c_pkgs', options,
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('Miniconda  run succesfully' );
      }
    );

}

function condainstall()
{
    sudo.exec('conda install -q -y -c bioconda fastqc multiqc hisat2 samtools stringtie gffcompare gffread htseq &&  conda install -q -y -c conda-forge r-base', options,
    function(error, stdout, stderr) {
      if (error) throw error;
      console.log('Conda run succesfully' );
    }
  );
}

function tricurl()
{
    exec("curl -O http://www.usadellab.org/cms/uploads/supplementary/Trimmomatic/Trimmomatic-0.39.zip", curltrimmomatic);
    // Callback
    function curltrimmomatic(error, stdout, stderr) {
       console.log("curl trimmomatic done")
    }
    
}
function mvtri()
{
    exec("mv Trimmomatic-0.39.zip $HOME/C_files/application ", movetri);
function movetri(error, stdout, stderr) {
   console.log("curl trimmomatic move done")
}
}

function unziptri()
{
    exec("unzip $HOME/C_files/application/Trimmomatic-0.39.zip ", unziptrimm);
function unziptrimm(error, stdout, stderr) {
   console.log("curl trimmomatic unzip done")
}
}

function installcpat()
{
    exec("pip3 install CPAT ", pipcpat);
function pipcpat(error, stdout, stderr) {
   console.log("pip3 install cpat")
}
}

function annotation()
{
    exec("mkdir -p $HOME/C_files/genome/human/hg38/annotation && curl -OL https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_40/gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz", annotation);
function annotation(error, stdout, stderr) {
   console.log("curl and make dir ")
}
}

function mvann()
{
    sudo.exec('mv *.annotation.gtf.gz $HOME/C_files/genome/human/hg38/annotation   &&  gzip -d gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz', options,
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('move anf gzip gwencode' );
      }
    );

}

function refgen()
{
    exec("mkdir -p $HOME/C_files/genome/human/hg38/ref_gen && curl -OL http://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz && mv hg38.fa.gz $HOME/C_files/genome/human/hg38/ref_gen", refmv);
function refmv(error, stdout, stderr) {
   console.log("curl and make dir ")
}
}

function gziprefgz()
{
    exec("gzip -d $HOME/C_files/genome/human/hg38/ref_gen/hg38.fa.gz", gzipref);
function gzipref(error, stdout, stderr) {
   console.log("curl and make dir ")
}
}

function hitsat2build()
{
    exec("hisat2_extract_splice_sites.py $HOME/C_files/genome/human/hg38/annotation/gencode.v40.chr_patch_hapl_scaff.annotation.gtf \
> gencode.v40.splicesite.annotation.ss", splicest);
function splicest(error, stdout, stderr) {
   console.log("splice set file installed")
}
}

function makecurlref()
{
    exec("mkdir -p $HOME/C_files/genome/human/hg38/ref_gen && curl -OL http://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz && mv hg38.fa.gz $HOME/C_files/genome/human/hg38/ref_gen", mkcurlref);
function mkcurlref(error, stdout, stderr) {
   console.log("curl and make dir ")
}
}

function gzipreference()
{
    exec("gzip -d $HOME/C_files/genome/human/hg38/ref_gen/hg38.fa.gz", gzipreferencegz);
function gzipreferencegz(error, stdout, stderr) {
   console.log("move comple gzip ")
}
}

function hitsat2build2() {
    exec("hisat2-build hg38.fa hg38.fa", hitsatbuild);
function hitsatbuild(error, stdout, stderr) {
   console.log("hitsat2 ")
}
}

function Rscript() {
    exec("Rscript $PWD/source/conf.R", Rscript);
function Rscript(error, stdout, stderr) {
   console.log("Rscript")
}
}