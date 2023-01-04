// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const sudoPrompt = require('sudo-prompt');
const {home} = require('electron');
let userdir =app.getPath('home');
var curl = require('curlrequest');
const { waitForDebugger } = require('inspector');
const exec = require("child_process").exec;


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  })

  // and load the index.html of the app.
  const fs = require('fs');

fs.readFile('check.json', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  const jsonData = JSON.parse(data);
  console.log(jsonData.is_installed);



if(jsonData.is_installed==='false'){
  data= '{"is_installed":"true"}'
  const jsonData = JSON.parse(data);
  fs.writeFile('check.json', JSON.stringify(jsonData), (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Data written to file');
  });

linux_dep1();
setTimeout(linux_dep2,5000);
mkcfiles();
setTimeout(wgetcurl,10000);
setTimeout(tar,20000);
setTimeout(tarconfig,25000);
setTimeout(minicondacurl,35000);
setTimeout(cpakgs,45000)
setTimeout(condainstall,65000);
setTimeout(tricurl,85000);
setTimeout(mvtri,95000)
setTimeout(unziptri,100000)
setTimeout(installcpat,110000)
setTimeout(annotation,150000)
setTimeout(mvann,175000)
setTimeout(refgen,190000)
setTimeout(gziprefgz,205000)
setTimeout(hitsat2build,220000)
setTimeout(makecurlref,230000)
setTimeout(gzipreference,240000)
setTimeout(hitsat2build2,260000)
setTimeout(Rscript,275000)
// minicondacurl();
// cpakgs();
// condainstall();


  
async function linux_dep1(){
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
  async function linux_dep2()
  {
    var sudo = require('sudo-prompt');
      var options = {
        name: 'Electron',
        //cns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
      };
      sudo.exec('apt-get install -y  ibcurl4-openssl-dev libmagick++-dev libmariadbclient-dev libssl-dev', options,
        function(error, stdout, stderr) {
          if (error) throw error;
          console.log('stdout: ' + stdout);
        }
      );
  
  }
  
  function mkcfiles(){
  // Execute bash script
  const exec = require("child_process").exec;
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
        timeout: 10000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
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
    var sudo = require('sudo-prompt');
    var options = {
      name: 'Electron',
      //cns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
    };
  sudo.exec('tar -xvf $HOME/C_files/application/curl-7.55.0.tar.gz -C  $HOME/C_files/application/', options,
        function(error, stdout, stderr) {
          if (error) throw error;
          console.log('Tar extracted succcesfully ' );
        }
      );
  }
  
  function tarconfig()
  {
    var sudo = require('sudo-prompt');
      var options = {
        name: 'Electron',
        //cns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
      };
      sudo.exec('$HOME/C_files/application/curl-7.55.0/configure && make && make install', options,
        function(error, stdout, stderr) {
          if (error) throw error;
          console.log('Configure run succesfully' );
        }
      );
  }
  
  function minicondacurl()
  {
    const exec = require("child_process").exec;
  exec("curl -O https://repo.anaconda.com/miniconda/Miniconda3-py39_4.11.0-Linux-x86_64.sh ", curlminiconda);
   
  // Callback
  function curlminiconda(error, stdout, stderr) {
     console.log("curl done")
  }
  
  }
  
  function cpakgs()
  {
    var sudo = require('sudo-prompt');
      var options = {
        name: 'Electron',
        //cns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
      };
      sudo.exec('bash $PWD/Miniconda3-py39_4.11.0-Linux-x86_64.sh -u  ', options,
        
      function(error, stdout, stderr) {
          if (error) throw error;
          console.log('Miniconda  run succesfully' );
        }
      );
  
  }
  
 async function condainstall()
  {
    var sudo = require('sudo-prompt');
      var options = {
        name: 'Electron',
        //cns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
      };
      sudo.exec('conda install -q -y -c bioconda fastqc multiqc hisat2 samtools stringtie gffcompare gffread htseq ', options,
      //&&  conda install -q -y -c conda-forge r-base
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('Conda run succesfully' );
      }
    );
    sudo.exec('conda install -q -y -c conda-forge r-base', options,
      //&&  conda install -q -y -c conda-forge r-base
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log('Conda run succesfully' );
      }
    );
  }
  
  function tricurl()
  {
    const exec = require("child_process").exec;
      exec("curl -O http://www.usadellab.org/cms/uploads/supplementary/Trimmomatic/Trimmomatic-0.39.zip", curltrimmomatic);
      // Callback
      function curltrimmomatic(error, stdout, stderr) {
         console.log("curl trimmomatic done")
      }
      
  }
  function mvtri()
  {
    const exec = require("child_process").exec;

      exec("mv Trimmomatic-0.39.zip $HOME/C_files/application ", movetri);
  function movetri(error, stdout, stderr) {
     console.log("curl trimmomatic move done")
  }
  }
  
  function unziptri()
  {
      exec("unzip $HOME/C_files/application/Trimmomatic-0.39.zip  $HOME/C_files/application/", unziptrimm);
  function unziptrimm(error, stdout, stderr) {
     console.log("curl trimmomatic unzip done")
  }
  }
  
  function installcpat()
  {const exec = require("child_process").exec;
      exec("pip3 install CPAT ", pipcpat);
  function pipcpat(error, stdout, stderr) {
     console.log("pip3 install cpat")
  }
  }
  
  function annotation()
  {
    const exec = require("child_process").exec;
      exec("mkdir -p $HOME/C_files/genome/human/hg38/annotation && curl -OL https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_40/gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz", annotation);
  function annotation(error, stdout, stderr) {
     console.log("curl and make dir ")
  }
  }
  
  function mvann()
  {
    var sudo = require('sudo-prompt');
      var options = {
        name: 'Electron',
        //cns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
      };
      sudo.exec('mv $PWD/gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz $HOME/C_files/genome/human/hg38/annotation   &&  gzip -d $HOME/C_files/genome/human/hg38/annotation/gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz', options,
        function(error, stdout, stderr) {
          if (error) throw error;
          console.log('move anf gzip gwencode' );
        }
      );
  
  }
  
  function refgen()
  {
    const exec = require("child_process").exec;
      exec("mkdir -p $HOME/C_files/genome/human/hg38/ref_gen && curl -OL http://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz && mv hg38.fa.gz $HOME/C_files/genome/human/hg38/ref_gen", refmv);
  function refmv(error, stdout, stderr) {
     console.log("curl and make dir ")
  }
  }
  
  function gziprefgz()
  {const exec = require("child_process").exec;
      exec("gzip -d $HOME/C_files/genome/human/hg38/ref_gen/hg38.fa.gz", gzipref);
  function gzipref(error, stdout, stderr) {
     console.log("curl and make dir ")
  }
  }
  
  function hitsat2build()
  {
    const exec = require("child_process").exec;
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
  { const exec = require("child_process").exec;
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
    const exec = require("child_process").exec;
      exec("Rscript $PWD/source/conf.R", Rscript);
  function Rscript(error, stdout, stderr) {
     console.log("Rscript")
  }
  }
  mainWindow.loadFile('app/setup.html')
}
else{
  mainWindow.loadFile('app/index.html')
  
}


});
 
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
